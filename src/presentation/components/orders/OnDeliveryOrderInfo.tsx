import { useQuery } from '@tanstack/react-query'
import { Button, Card, Text } from '@ui-kitten/components'
import { StyleProp, View, ViewStyle} from 'react-native'
import { getWaitingOrders } from '../../../actions/orders/get-waiting-orders';
import { useOrderStore } from '../../store/orders/useOrdersStore';
import Separator from '../settings/Separator';
import { OrderDishResponse } from '../../../infrastructure/interfaces/orders.response';

interface Props {
  style?: StyleProp<ViewStyle>;
  totalPrice: number;
  orderId: string;
  deliveryPointId: string;
  userName: string;
  orderDish: OrderDishResponse[];
}

const OnDeliveryOrderInfo = ({totalPrice, orderId, deliveryPointId, userName, orderDish, style}:Props) => {

  const foodStandId = useOrderStore(state => state.foodStandId)

  const {} = useQuery({
    queryKey: [`orderOnRoute-${orderId}`],
    queryFn:() => {
      if(!foodStandId) throw new Error('foodStandId es requerido')
      return getWaitingOrders(foodStandId, deliveryPointId)},
  })



  return (
    <Card
      header={() => <Header  userName={userName}/>}
      footer={Footer}
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
export default OnDeliveryOrderInfo


const Header = ({userName}: {userName: string}) => (
    <View style ={{padding: 10, backgroundColor: '#E0E7FF'}}>
        <Text category='h6'>{userName}</Text>
    </View>
)

const Footer = () => (
  <>
  <View style = {{flexDirection: 'row', justifyContent: 'space-around', padding: 20, }}>
    <Button
      status='success'
      >
      Terminar
    </Button>
    <Button
      status='warning'
      >
      Regresar
    </Button>
    <Button
      status='danger'
      >
      Cancelar
    </Button>
  </View>
  {/* <View style = {{flexDirection: 'row', justifyContent: 'space-around', padding: 20, paddingBottom: 20 }}>
    <Button
      status='success'
      >
      Aceptar
    </Button>
    <Button
      status='warning'
      >
      Regresar
    </Button>
    <Button
      status='danger'
      >
      Cancelar
    </Button>
  </View> */}
  </>
)