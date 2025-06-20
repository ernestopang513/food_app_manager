import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { connectToServer, socket, disconnectSocket } from '../../../../config/sockets/socketOrders';
import { useAuthStore } from '../../../store/auth/useAuthStore';
import { useOrderStore } from '../../../store/orders/useOrdersStore';
import NetInfo from '@react-native-community/netinfo';
import { useUIStore } from '../../../store/ui/useUIStore';
import { log } from '../../../../config/loggers/logger';

const useSocketOrders = () => {
  const queryClient = useQueryClient();
  const userToken = useAuthStore(state => state.token);
  const foodStandId = useOrderStore(state => state.foodStandId);
  const deliveryPointId = useOrderStore(state => state.deliveryPointId);
  const setSocketError = useUIStore(state => state.setSocketError);
  const deliveryUserId = useAuthStore(state => state.user?.id);
  const [isConnected, setIsConnected] = useState(true);
  const hasConnected = useRef(false);

  // 🔌 Escuchar estado de red
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected === true);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // 🔁 Conectar socket cuando hay token + conexión
  useEffect(() => {
    if (!userToken || !isConnected || hasConnected.current) return;

    connectToServer(userToken);
    hasConnected.current = true;

    return () => {
      disconnectSocket();
      hasConnected.current = false;
    };
  }, [userToken, isConnected]);

  useEffect(() => {
    if (!socket) return;

    const handleError = (err: any) => {
      setSocketError(`Error de conexión: ${err?.message || 'desconocido'}`);
    };

    const handleReconnectFailed = () => {
      setSocketError('No se pudo reconectar con el servidor.');
    };

    const handleReconnect = () => {
      setSocketError(undefined); // Limpiar si reconecta
    };

    socket.on('connect_error', handleError);
    socket.on('reconnect_failed', handleReconnectFailed);
    socket.on('reconnect', handleReconnect);

    return () => {
      socket.off('connect_error', handleError);
      socket.off('reconnect_failed', handleReconnectFailed);
      socket.off('reconnect', handleReconnect);
    };
  }, [socket]);



  // 🧠 Listeners
  useEffect(() => {
    if (!socket || !isConnected || !socket.connected) return;

    const listener = (payload: { deliveryPointId: string; orderId: string; foodStandId: string }) => {
      if (payload.foodStandId === foodStandId) {
        queryClient.invalidateQueries({ queryKey: ['OrdersWaitingByDeliveryPoints', payload.foodStandId] });
      }

      if (payload.deliveryPointId === deliveryPointId) {
        queryClient.invalidateQueries({ queryKey: [`waitingOrders-${payload.deliveryPointId}`] });
      }
      queryClient.invalidateQueries({ queryKey: ['OrdersForDelivery'] });
      
    };

    const listenerDeliveryUser = (payload: { 
      deliveryPointId: string; 
      orderId: string; 
      foodStandId: string, 
      deliveryUserId: string }) => {
      if(payload.deliveryUserId === deliveryUserId ) {
        log(JSON.stringify(payload,null,2))
        log('Se invalido las ordenes on route de:', payload.deliveryUserId, '---');
        log('Y estamos con: ', deliveryUserId);
        queryClient.invalidateQueries({queryKey: ['OrdersForDelivery', payload.deliveryUserId, foodStandId, deliveryPointId ]})
      }
    }

    socket.on('order-assigned', listener);
    socket.on('deliveryUser-order-update', listenerDeliveryUser);

    return () => {
      socket.off('order-assigned', listener);
    };
  }, [foodStandId, deliveryPointId, queryClient, isConnected]);
};

export default useSocketOrders;
