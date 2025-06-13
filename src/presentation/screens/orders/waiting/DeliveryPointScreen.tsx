import { StackScreenProps } from '@react-navigation/stack'
import { StackParamsWaiting } from '../../../routes/orders/waitingStack/WaitingStackNavigator'
import { Layout, Text } from '@ui-kitten/components'
import { useQuery } from '@tanstack/react-query'
import { getWaitingOrders } from '../../../../actions/orders/get-waiting-orders'
import { useOrderStore } from '../../../store/orders/useOrdersStore'
import OrderInfo from '../../../components/orders/OrderInfo'
import { RefreshControl, ScrollView, View } from 'react-native'
import { useCallback, useState } from 'react'
import { NavigationProp, useFocusEffect, useNavigation } from '@react-navigation/native'

interface Props extends StackScreenProps<StackParamsWaiting, 'DeliveryPointScreen'>{}

const DeliveryPointScreen = ({route}: Props) => {

  const [acceptedOrders, setAcceptedOrders] = useState<string[]>([])
  const foodStandId = useOrderStore(state => state.foodStandId);
  const {deliveryPointId, dpName} = route.params
  const foodStandName = useOrderStore(state => state.foodStandName);

  const {goBack} = useNavigation<NavigationProp<StackParamsWaiting>>();

  const {data: wOrdersDp, isLoading, isError, refetch} = useQuery({
    queryKey: [`waitingOrders-${deliveryPointId}`],
    queryFn: () => {
      if(!foodStandId) throw new Error('foodStandId es requerido')
      return getWaitingOrders( foodStandId  , deliveryPointId)},
    staleTime: 0,
  });

  const [refreshing, setRefreshing] = useState(false);
  
      useFocusEffect(
          useCallback(() => {
              refetch();
          }, [refetch])
      );
  
  
      const handleRefresh = useCallback(async () => {
          setRefreshing(true);
          try {
              await refetch()
          } finally {
              setRefreshing(false)
          }
      }, [refetch]);

      const handleAccepted = (orderId: string) => {
        setAcceptedOrders(prev => {
          const newAccepted = [...prev,orderId];
          const reaminingOrders = wOrdersDp?.filter(order => !newAccepted.includes(order.id));
          if(!reaminingOrders || reaminingOrders.length === 0 ){
            goBack();
          }
          return newAccepted
        })
      }
      
  

  return (
    <Layout style = {{flex: 1, paddingHorizontal: 20, paddingTop: 20}}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing= {refreshing} onRefresh={handleRefresh}/>
        }
      >

      <Text category='h2' 
        style ={{textAlign: 'center'}}
        >{dpName}</Text>
      <Text category='label' 
        style ={{textAlign: 'center', marginBottom: 20}}
        >{foodStandName}</Text>
      {

        wOrdersDp?.filter(order => !acceptedOrders.includes(order.id)).map((item) => (
          <OrderInfo
          style ={{marginVertical: 10}}
          totalPrice = {item.totalPrice}
          deliveryPointId = {deliveryPointId}
          orderId = {item.id}
          userName = {item.user.userName}
          key={item.id}
          orderDish = {item.orderDish}
          onAccepted={() => handleAccepted(item.id)}
          />
        ))
      }

      <View style ={{height: 50}} />

      </ScrollView>
    </Layout>
  )
}
export default DeliveryPointScreen




