
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { connectToServer, socket, disconnectSocket } from '../../../../config/sockets/socketOrders';
import { useAuthStore } from '../../../store/auth/useAuthStore';
import { useOrderStore } from '../../../store/orders/useOrdersStore';

const useSocketWaitingOrders = () => {
  const queryClient = useQueryClient();
  const userToken = useAuthStore(state => state.token);
  const foodStandId = useOrderStore(state => state.foodStandId);
  const deliveryPointId = useOrderStore(state => state.deliveryPointId);

  // 1️⃣ Solo conectar socket una vez cuando tengas el token
  useEffect(() => {
    if (!userToken) return;

    connectToServer(userToken);

    return () => {
      disconnectSocket();
    };
  }, [userToken]);

  useEffect(() => {
    if (!socket) return;

    const listener = (payload: { deliveryPointId: string; orderId: string; foodStandId: string }) => {
      if (payload.foodStandId === foodStandId) {
        queryClient.invalidateQueries({ queryKey: ['OrdersWaitingByDeliveryPoints', payload.foodStandId] });
      }

      if (payload.deliveryPointId === deliveryPointId) {
        queryClient.invalidateQueries({ queryKey: [`waitingOrders-${payload.deliveryPointId}`] });
      }
    };

    socket.on('order-assigned', listener);

    return () => {
      socket.off('order-assigned', listener);
    };
  }, [foodStandId, deliveryPointId, queryClient]);
};

export default useSocketWaitingOrders;
