import { StackScreenProps } from '@react-navigation/stack'
import { StackParamsWaiting } from '../../../routes/orders/waitingStack/WaitingStackNavigator'
import { Layout, Text } from '@ui-kitten/components'
import { useQuery } from '@tanstack/react-query'
import { getWaitingOrders } from '../../../../actions/orders/get-waiting-orders'
import { useOrderStore } from '../../../store/orders/useOrdersStore'
import OrderInfo from '../../../components/orders/OrderInfo'
import { ScrollView, View } from 'react-native'

interface Props extends StackScreenProps<StackParamsWaiting, 'DeliveryPointScreen'>{}

const DeliveryPointScreen = ({route}: Props) => {

  const foodStandId = useOrderStore(state => state.foodStandId);
  const {deliveryPointId, dpName} = route.params
  const foodStandName = useOrderStore(state => state.foodStandName);
  const {data: wOrdersDp, isLoading, error} = useQuery({
    queryKey: [`waitingOrders-${deliveryPointId}`],
    queryFn: () => {
      if(!foodStandId) throw new Error('foodStandId es requerido')
      return getWaitingOrders( foodStandId  , deliveryPointId)},
    staleTime: 0,
  });


  return (
    <Layout style = {{flex: 1, paddingHorizontal: 20, paddingTop: 20}}>
      <ScrollView>

      <Text category='h2' 
        style ={{textAlign: 'center'}}
        >{dpName}</Text>
      <Text category='label' 
        style ={{textAlign: 'center', marginBottom: 20}}
        >{foodStandName}</Text>
      {
        wOrdersDp?.map((item) => (
          // <Layout key={item.id}>
          //   <Text>{item.id}</Text>
          // </Layout>
          <OrderInfo
          style ={{marginVertical: 10}}
          totalPrice = {item.totalPrice}
          deliveryPointId = {deliveryPointId}
          orderId = {item.id}
          userName = {item.user.userName}
          key={item.id}
          orderDish = {item.orderDish}
          />
        ))
      }

      <View style ={{height: 50}} />

      </ScrollView>
    </Layout>
  )
}
export default DeliveryPointScreen




