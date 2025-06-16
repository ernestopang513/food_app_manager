import { StackScreenProps } from '@react-navigation/stack'
import { StackParamsWaiting } from '../../../routes/orders/waitingStack/WaitingStackNavigator'
import { Layout, Text, useTheme } from '@ui-kitten/components'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getWaitingOrders } from '../../../../actions/orders/get-waiting-orders'
import { useOrderStore } from '../../../store/orders/useOrdersStore'
import OrderInfo from '../../../components/orders/OrderInfo'
import { LayoutAnimation, RefreshControl, ScrollView, View } from 'react-native'
import { useCallback, useEffect, useState } from 'react'
import { NavigationProp, useFocusEffect, useNavigation } from '@react-navigation/native'
import AnimatedCardWrapper from '../../../components/ui/animations/AnimatedCardWrapper'
import FAB from '../../../components/ui/FAB'
import { connectToServer, disconnectSocket, socket } from '../../../../config/sockets/socketOrders'
import { useAuthStore } from '../../../store/auth/useAuthStore'

interface Props extends StackScreenProps<StackParamsWaiting, 'DeliveryPointScreen'>{}

const DeliveryPointScreen = ({route}: Props) => {
  const [showFab, setShowFab] = useState(false);
  const [acceptedOrders, setAcceptedOrders] = useState<string[]>([])
  const foodStandId = useOrderStore(state => state.foodStandId);
  const {deliveryPointId, dpName} = route.params
  const foodStandName = useOrderStore(state => state.foodStandName);
  const userToken = useAuthStore(state => state.token);

  const {goBack} = useNavigation<NavigationProp<StackParamsWaiting>>();

  const theme = useTheme();
  const queryClient = useQueryClient();
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

        setShowFab(true);
        
        setTimeout(() => {
          setShowFab(false);
        }, 1500)
        }
      
  useEffect(() => {
    connectToServer(userToken)
    socket?.on('order-assigned', (payload: {deliveryPointId: string, orderId: string})=>{
      console.log('Pues si se activo la funcion del socket')
      if(payload.deliveryPointId === deliveryPointId) {
        console.log('Si es igual')
        queryClient.invalidateQueries({queryKey: [`waitingOrders-${deliveryPointId}`]});
      }else {
        console.log('no es igual')
      }
      
    })
    return () => {
      socket?.off('order-assigned')
      disconnectSocket();

    }
  }, []);

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
          <AnimatedCardWrapper
            key={item.id}
          >

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
         </AnimatedCardWrapper>
        ))
      }

      <View style ={{height: 50}} />

      </ScrollView>
      {showFab && (
  <FAB
    iconName="checkmark-circle-outline"
    iconHeight={50}
    label='Order agragada'
    onPress={() => {}}
    style={{
      position: 'absolute',
      bottom: 30,
      alignSelf: 'center',
      zIndex: 100,
      // backgroundColor: theme['color-success-500'],
      backgroundColor: '#50C878',
      borderColor: 'transparent',
      borderRadius: 40
    }}
  />
)}
    </Layout>
  )
}
export default DeliveryPointScreen




