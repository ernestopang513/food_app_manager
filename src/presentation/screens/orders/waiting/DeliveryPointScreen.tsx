import { StackScreenProps } from '@react-navigation/stack'
import { StackParamsWaiting } from '../../../routes/orders/waitingStack/WaitingStackNavigator'
import { Layout, Text } from '@ui-kitten/components'
import { useQuery } from '@tanstack/react-query'
import { getWaitingOrders } from '../../../../actions/orders/get-waiting-orders'
import { useOrderStore } from '../../../store/orders/useOrdersStore'

interface Props extends StackScreenProps<StackParamsWaiting, 'DeliveryPointScreen'>{}

const DeliveryPointScreen = ({route}: Props) => {

  const {foodStandId} = useOrderStore();
  const {deliveryPointId, dpName} = route.params

  const {data: wOrdersDp, isLoading, error} = useQuery({
    queryKey: [`orders-${deliveryPointId}`],
    queryFn: () => {
      if(!foodStandId) throw new Error('foodStandId es requerido')
      return getWaitingOrders( foodStandId  , deliveryPointId)},
    staleTime: 0,
  });


  return (
    <Layout style = {{flex: 1, paddingHorizontal: 20, paddingTop: 20}}>
      <Text category='h2' 
        style ={{textAlign: 'center'}}
      >{dpName}</Text>
      {
        wOrdersDp?.map((item) => (
          <Layout key={item.id}>
            <Text>{item.id}</Text>
          </Layout>
        ))
      }
    </Layout>
  )
}
export default DeliveryPointScreen




