import { useMutation, useQuery } from '@tanstack/react-query'
import { Button, Card, Layout, Text } from '@ui-kitten/components'
import { Animated, StyleProp, View, ViewStyle} from 'react-native'
import { getWaitingOrders } from '../../../actions/orders/get-waiting-orders';
import { useOrderStore } from '../../store/orders/useOrdersStore';
import Separator from '../settings/Separator';
import { OrderDishResponse } from '../../../infrastructure/interfaces/orders.response';
import { useAuthStore } from '../../store/auth/useAuthStore';
import { updateOrderStatus } from '../../../actions/orders/update-order-status';
import { OrderStatus } from '../../../domain/enums/status';
import { useFabStore } from '../../store/orders/useFabStore';
import { useRef } from 'react';
import { cancelOrderDeliverUser } from '../../../actions/orders/cancel-order-deliver-user';

interface Props {
  style?: StyleProp<ViewStyle>;
  totalPrice: number;
  orderId: string;
  deliveryPointId: string;
  userName: string;
  orderDish: OrderDishResponse[];
  handleOrderStatus: () => void;
}

const OnDeliveryOrderInfo = ({totalPrice, orderId, deliveryPointId, userName, orderDish, style,handleOrderStatus}:Props) => {

  const foodStandId = useOrderStore(state => state.foodStandId);
  const deliveryUserId = useAuthStore(state => state.user?.id);

  //* Animaciones
  const opacityAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const setLabel = useFabStore(state => state.setLabel);
  const setIconName = useFabStore(state => state.setIconName);
  const setBackgroundColor = useFabStore(state => state.setBackgroundColor);

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


  const completeOrder = useMutation({
    mutationFn: () => {
      if(!orderId || !deliveryUserId ) throw new Error("Faltan parametros")
      return updateOrderStatus(orderId, deliveryUserId, OrderStatus.ENTREGADO)
    },
    onSuccess: () => {
      setLabel('Order entregada');
      setIconName('checkmark-circle-outline');
      setBackgroundColor('#50c878');
      handleOrderStatus();
      hideWithAnimation();
    },
    onError: () => {
      setLabel('Accion fallida');
      setIconName('close-circle-outline');
      setBackgroundColor('#c0392b');
      handleOrderStatus();
    }
  })
  const returnOrder = useMutation({
    mutationFn: () => {
      if(!orderId || !deliveryUserId ) throw new Error("Faltan parametros")
      return updateOrderStatus(orderId, deliveryUserId, OrderStatus.PENDIENTE)
    },
    onSuccess: () => {
      setLabel('Order entregada');
      setIconName('checkmark-circle-outline');
      setBackgroundColor('#50c878');
      handleOrderStatus();
      hideWithAnimation();
    },
    onError: () => {
      setLabel('Accion fallida');
      setIconName('close-circle-outline');
      setBackgroundColor('#c0392b');
      handleOrderStatus();
    }
  })
  const cancelOrder = useMutation({
    mutationFn: () => {
      if(!orderId || !deliveryUserId ) throw new Error("Faltan parametros")
      return cancelOrderDeliverUser(orderId);
    },
    onSuccess: () => {
      setLabel('Order entregada');
      setIconName('checkmark-circle-outline');
      setBackgroundColor('#50c878');
      handleOrderStatus();
      hideWithAnimation();
    },
    onError: () => {
      setLabel('Accion fallida');
      setIconName('close-circle-outline');
      setBackgroundColor('#c0392b');
      handleOrderStatus();
    }
  })

  return (
    <Animated.View
      style ={{
        opacity: opacityAnim,
        transform: [{scale: scaleAnim}]
      }}
    >

      <Card
        header={() => <Header userName={userName} />}
        footer={() => <Footer completeOrder={completeOrder.mutate} returnOrder={returnOrder.mutate } cancelOrder={cancelOrder.mutate} />}
        style={[{ borderWidth: 2 }, style]}
        disabled={true}
      >

        {
          orderDish.map((item) => (

            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}
              key={item.id}
            >
              <Text  >{item.dish.name}:</Text>
              <Text>{item.quantity}</Text>
            </View>
          ))
        }

        <Separator styleWrapper={{ backgroundColor: 'transparent' }} />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }} >
          <Text  >Payment method:</Text>
          <Text>Efectivo</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
          <Text  >Precio total:</Text>
          <Text>{totalPrice}</Text>
        </View>

      </Card>
    </Animated.View>
  )
}
export default OnDeliveryOrderInfo


const Header = ({userName}: {userName: string}) => (
    <View style ={{padding: 10, backgroundColor: '#E0E7FF'}}>
        <Text category='h6'>{userName}</Text>
    </View>
)

interface FooterProps {
  completeOrder: () => void,
  returnOrder: () => void,
  cancelOrder: () => void,
  
}

const Footer = ({completeOrder, returnOrder, cancelOrder}: FooterProps) => (
  
  <Layout style = {{flexDirection: 'row', justifyContent: 'space-around', padding: 10, width: '100%' }}>
    <Button
      size='small'
      status='success'
      onPress={completeOrder}
      >
      Terminar
    </Button>
    <Button
    size='small'
      status='warning'
      onPress={returnOrder}
      >
      Regresar
    </Button>
    <Button
    size='small'
      status='danger'
      onLongPress={cancelOrder}
      >
      Cancelar
    </Button>
  </Layout>
 
 
)