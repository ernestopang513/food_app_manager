import { UseMutateFunction, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button, Card, Text, useTheme } from '@ui-kitten/components'
import { Animated, LayoutAnimation, StyleProp, View, ViewStyle} from 'react-native'
import { getWaitingOrders } from '../../../actions/orders/get-waiting-orders';
import { useOrderStore } from '../../store/orders/useOrdersStore';
import Separator from '../settings/Separator';
import { OrderDishResponse } from '../../../infrastructure/interfaces/orders.response';
import { setOnRouteOrder } from '../../../actions/orders/set-onRoute-order';
import { useAuthStore } from '../../store/auth/useAuthStore';
import { User } from '../../../domain/entities/user';
import { AxiosResponse } from 'axios';
import { useRef } from 'react';
import { useFabStore } from '../../store/orders/useFabStore';
import { cancelOrderDeliverUser } from '../../../actions/orders/cancel-order-deliver-user';

interface Props {
  style?: StyleProp<ViewStyle>;
  totalPrice: number;
  orderId: string;
  userName: string;
  orderDish: OrderDishResponse[];
  handleOrderStatus: () => void
}

const OrderInfo = ({ totalPrice, orderId, userName, orderDish, style, handleOrderStatus }: Props) => {
  const deliveryUserId = useAuthStore(state => state.user?.id)
  const queryClient = useQueryClient();
  const opacityAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const setLabel = useFabStore(state => state.setLabel);
  const setIconName = useFabStore(state => state.setIconName);
  const setBackgroundColor = useFabStore(state => state.setBackgroundColor);

  const theme = useTheme();

  const hideWithAnimation = () => {
    Animated.parallel([
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0.8,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
    });
  };

  const setOnRoute = useMutation({
    mutationFn: () => {
      if (!deliveryUserId) throw new Error("Faltan parametros");
      return setOnRouteOrder(orderId, deliveryUserId);
    },
    onSuccess: () => {
      setLabel('Orden agregada');
      setIconName('checkmark-circle-outline');
      setBackgroundColor('#50C878');
      queryClient.invalidateQueries({ queryKey: ['onRouteOrdesByDeliveryPoint'] });
      queryClient.invalidateQueries({ queryKey: ['OrdersForDelivery'] });
      handleOrderStatus();
      hideWithAnimation(); // 👈 animación antes de cambiar
      
    },
    onError: () => {
      setLabel('Accion fallida');
      setIconName('close-circle-outline');
      setBackgroundColor('#c0392b');
      handleOrderStatus();
    }

  });
  
  const cancelOrder = useMutation({
    mutationFn: () => {
      if (!deliveryUserId) throw new Error("Faltan parametros");
      // return setOnRouteOrder(orderId, deliveryUserId);
      return cancelOrderDeliverUser(orderId);
    },
    onSuccess: () => {
      setLabel('Orden cancelada');
      setIconName('checkmark-circle-outline');
      // setBackgroundColor(theme['color-warning-500']);
      queryClient.invalidateQueries({ queryKey: ['onRouteOrdesByDeliveryPoint'] });
      setBackgroundColor('#50c878');
      queryClient.invalidateQueries({ queryKey: ['OrdersForDelivery'] });
      handleOrderStatus();
      hideWithAnimation(); // 👈 animación antes de cambiar
      
    },
    onError: () => {
      setLabel('Accion fallida');
      setIconName('close-circle-outline');
      setBackgroundColor('#c0392b');
      handleOrderStatus();
    }

  });

  return (
    <Animated.View style={{
      opacity: opacityAnim,
      transform: [{ scale: scaleAnim }],
    }}>
      <Card
        header={() => <Header userName={userName} />}
        footer={() => <Footer 
                        setOnRoute={setOnRoute.mutate} 
                        cancelOrder={cancelOrder.mutate} 
                        setDisabled ={setOnRoute.isPending} 
                        cancelDisabled = {cancelOrder.isPending} 
                      />}
        style={[{ borderWidth: 2, marginBottom: 10 }, style]}
        disabled={true}
      >
        {orderDish.map((item) => (
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}
            key={item.id}
          >
            <Text>{item.dish.name}:</Text>
            <Text>{item.quantity}</Text>
          </View>
        ))}

        <Separator styleWrapper={{ backgroundColor: 'transparent' }} />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
          <Text>Payment method:</Text>
          <Text>Efectivo</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text>Precio total:</Text>
          <Text>{totalPrice}</Text>
        </View>
      </Card>
    </Animated.View>
  );
};
export default OrderInfo


const Header = ({userName}: {userName: string}) => (
    <View style ={{padding: 10, backgroundColor: '#E0E7FF'}}>
        <Text category='h6'>{userName}</Text>
    </View>
)

interface FooterProps {
  setOnRoute: () => void;
  cancelOrder: () => void;
  setDisabled: boolean;
  cancelDisabled: boolean;
}

const Footer = ({setOnRoute, cancelOrder,setDisabled, cancelDisabled}:FooterProps) => (
  <View style = {{flexDirection: 'row', justifyContent: 'space-around', padding: 20, }}>
    <Button
      onPress={setOnRoute}
      disabled ={setDisabled}
      status='success'
    >
      Aceptar
    </Button>
    <Button
      onLongPress={cancelOrder}
      disabled = {cancelDisabled}
      status='danger'
    >
      Cancelar
    </Button>
  </View>
)