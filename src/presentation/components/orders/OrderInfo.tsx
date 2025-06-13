import { UseMutateFunction, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button, Card, Text } from '@ui-kitten/components'
import { StyleProp, View, ViewStyle} from 'react-native'
import { getWaitingOrders } from '../../../actions/orders/get-waiting-orders';
import { useOrderStore } from '../../store/orders/useOrdersStore';
import Separator from '../settings/Separator';
import { OrderDishResponse } from '../../../infrastructure/interfaces/orders.response';
import { setOnRouteOrder } from '../../../actions/orders/set-onRoute-order';
import { useAuthStore } from '../../store/auth/useAuthStore';
import { User } from '../../../domain/entities/user';
import { AxiosResponse } from 'axios';

interface Props {
  style?: StyleProp<ViewStyle>;
  totalPrice: number;
  orderId: string;
  deliveryPointId: string;
  userName: string;
  orderDish: OrderDishResponse[];
  onAccepted: () => void
}

const OrderInfo = ({totalPrice, orderId, deliveryPointId, userName, orderDish, style, onAccepted}:Props) => {

  const deliveryUserId = useAuthStore(state => state.user?.id)
  const queryClient = useQueryClient();

  // const {} = useQuery({
  //   queryKey: [`order-${orderId}`],
  //   queryFn:() => {
  //     if(!foodStandId) throw new Error('foodStandId es requerido')
  //     return getWaitingOrders(foodStandId, deliveryPointId)},
  // })

  const mutation = useMutation({
    mutationFn: () => {
      if(!deliveryUserId) throw new Error("Faltan parametros")
      return setOnRouteOrder(orderId, deliveryUserId)
    },
    onSuccess: () => {
      onAccepted()
      queryClient.invalidateQueries({queryKey: [ 'onRouteOrdesByDeliveryPoint']})
      queryClient.invalidateQueries({queryKey: [ 'OrdersForDelivery']})
      // queryClient.invalidateQueries({queryKey: [ `waitingOrders-${deliveryPointId}`]})

    }
  })

  return (
    <Card
      header={() => <Header  userName={userName}/>}
      footer={() => <Footer mutation={mutation.mutate} />}
      style = {[{borderWidth: 2}, style]}
      disabled = {true}
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
          
      <Separator styleWrapper={{backgroundColor: 'transparent'}}/>
      <View style = {{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10}} >
      <Text  >Payment method:</Text>
      <Text>Efectivo</Text>
      </View>
      <View style = {{flexDirection: 'row', justifyContent: 'space-between'}} >
      <Text  >Precio total:</Text>
      <Text>{totalPrice}</Text>
      </View>

    </Card>
  )
}
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