import { StackScreenProps } from '@react-navigation/stack'
import { StackParamsWaiting } from '../../../routes/orders/waitingStack/WaitingStackNavigator'
import { Layout, Text, useTheme } from '@ui-kitten/components'
import { useOrderStore } from '../../../store/orders/useOrdersStore'
import OrderInfo from '../../../components/orders/OrderInfo'
import { RefreshControl, ScrollView, View } from 'react-native'
import { useEffect, useState } from 'react'
import AnimatedCardWrapper from '../../../components/ui/animations/AnimatedCardWrapper'
import FAB from '../../../components/ui/FAB'
import { useAuthStore } from '../../../store/auth/useAuthStore'
import { useFabStore } from '../../../store/orders/useFabStore'
import useWaitingOrders from '../../../hooks/orders/queryHooks/useWaitingOrders'
import useSocketWaitingOrders from '../../../hooks/orders/socketHooks/useSocketWaitingOrders'
import useRefreshOnFocus from '../../../hooks/orders/useRefreshOnFocus'

interface Props extends StackScreenProps<StackParamsWaiting, 'DeliveryPointScreen'>{}

const DeliveryPointScreen = ({route}: Props) => {

  const {deliveryPointId, dpName} = route.params
  const setDeliveryPointId = useOrderStore(state => state.setDeliveryPointId)
  
  const [showFab, setShowFab] = useState(false);
  
  const foodStandId = useOrderStore(state => state.foodStandId);
  const foodStandName = useOrderStore(state => state.foodStandName);
  const userToken = useAuthStore(state => state.token);
  const label = useFabStore(state => state.label);
  const iconName = useFabStore(state => state.iconName);
  const backgroundColor = useFabStore(state => state.backgroundColor);
  
  
  const waitingOrders = useWaitingOrders(foodStandId, deliveryPointId);
  
  
  const {refreshing, handleRefresh} = useRefreshOnFocus(waitingOrders.refetch);
  
  useEffect(() => {
    setDeliveryPointId(deliveryPointId);
    console.log('setDeliveryPintId')

  },[])

  const handleOrderStatus = () => {

        setShowFab(true);

        setTimeout(() => {
            setShowFab(false);
        }, 1500)
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
        waitingOrders.data?.length === 0 && !waitingOrders.isError 
        && !waitingOrders.isLoading && 
        <View>
          <Text>Por el momento no hay ordenes</Text>
        </View>
      }
      
      
      {
        waitingOrders.data &&
        waitingOrders.data.map((item) => (
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
          handleOrderStatus={() => handleOrderStatus()}
          />
         </AnimatedCardWrapper>
        ))
      }

      <View style ={{height: 50}} />

      </ScrollView>
      {showFab && (
  <FAB
    iconName={iconName}
    iconHeight={50}
    label={label}
    onPress={() => {}}
    style={{
      position: 'absolute',
      bottom: 30,
      alignSelf: 'center',
      zIndex: 100,
      backgroundColor: backgroundColor,
      borderColor: 'transparent',
      borderRadius: 40
    }}
  />
)}
    </Layout>
  )
}
export default DeliveryPointScreen




