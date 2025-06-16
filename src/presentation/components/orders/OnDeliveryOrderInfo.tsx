import { useQuery } from '@tanstack/react-query'
import { Button, Card, Layout, Text } from '@ui-kitten/components'
import { StyleProp, View, ViewStyle} from 'react-native'
import { getWaitingOrders } from '../../../actions/orders/get-waiting-orders';
import { useOrderStore } from '../../store/orders/useOrdersStore';
import Separator from '../settings/Separator';
import { OrderDishResponse } from '../../../infrastructure/interfaces/orders.response';
import { useAuthStore } from '../../store/auth/useAuthStore';

interface Props {
  style?: StyleProp<ViewStyle>;
  totalPrice: number;
  orderId: string;
  deliveryPointId: string;
  userName: string;
  orderDish: OrderDishResponse[];
}

const OnDeliveryOrderInfo = ({totalPrice, orderId, deliveryPointId, userName, orderDish, style}:Props) => {

  const foodStandId = useOrderStore(state => state.foodStandId);
  const deliveryUserId = useAuthStore(state => state.user?.id);

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
  
  <Layout style = {{flexDirection: 'row', justifyContent: 'space-around', padding: 10, width: '100%' }}>
    <Button
      size='small'
      status='success'
      >
      Terminar
    </Button>
    <Button
    size='small'
      status='warning'
      >
      Regresar
    </Button>
    <Button
    size='small'
      status='danger'
      >
      Cancelar
    </Button>
  </Layout>
 
 
)