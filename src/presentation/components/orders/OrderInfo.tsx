import { UseMutateFunction, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button, Card, Text } from '@ui-kitten/components'
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

interface Props {
  style?: StyleProp<ViewStyle>;
  totalPrice: number;
  orderId: string;
  deliveryPointId: string;
  userName: string;
  orderDish: OrderDishResponse[];
  onAccepted: () => void
}

const OrderInfo = ({ totalPrice, orderId, deliveryPointId, userName, orderDish, style, onAccepted }: Props) => {
  const deliveryUserId = useAuthStore(state => state.user?.id)
  const queryClient = useQueryClient();
  const opacityAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

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

  const mutation = useMutation({
    mutationFn: () => {
      if (!deliveryUserId) throw new Error("Faltan parametros");
      return setOnRouteOrder(orderId, deliveryUserId);
    },
    onSuccess: () => {
      // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
      queryClient.invalidateQueries({ queryKey: ['onRouteOrdesByDeliveryPoint'] });
      queryClient.invalidateQueries({ queryKey: ['OrdersForDelivery'] });
      onAccepted();
      // queryClient.invalidateQueries({ queryKey: [`waitingOrders-${deliveryPointId}`] });
      
    },
    onMutate: () =>{
      hideWithAnimation(); // 👈 animación antes de cambiar

    }, onError: () => {
      
    }

  });

  return (
    <Animated.View style={{
      opacity: opacityAnim,
      transform: [{ scale: scaleAnim }],
    }}>
      <Card
        header={() => <Header userName={userName} />}
        footer={() => <Footer mutation={mutation.mutate} />}
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
  mutation: () => void;
}

const Footer = ({mutation}:FooterProps) => (
  <View style = {{flexDirection: 'row', justifyContent: 'space-around', padding: 20, }}>
    <Button
      onPress={mutation}
      status='success'
    >
      Aceptar
    </Button>
    <Button
      status='danger'
    >
      Cancelar
    </Button>
  </View>
)