import { StackScreenProps } from '@react-navigation/stack'
import { StackParamsWaiting } from '../../../routes/orders/waitingStack/WaitingStackNavigator'
import { Text } from '@ui-kitten/components'
import { useOrderStore } from '../../../store/orders/useOrdersStore'
import OrderInfo from '../../../components/orders/OrderInfo'
import { FlatList, View } from 'react-native'
import { useEffect, useState } from 'react'
import AnimatedCardWrapper from '../../../components/ui/animations/AnimatedCardWrapper'
import FAB from '../../../components/ui/FAB'
import { useAuthStore } from '../../../store/auth/useAuthStore'
import { useFabStore } from '../../../store/orders/useFabStore'
import useWaitingOrders from '../../../hooks/orders/queryHooks/useWaitingOrders'
import useRefreshOnFocus from '../../../hooks/orders/useRefreshOnFocus'
import ErrorScreen from '../../../components/ui/ErrorScreen'
import NoticeScreen from '../../../components/ui/NoticeScreen'
import SkeletonCard from '../../../components/ui/SkeletonCard'

interface Props extends StackScreenProps<StackParamsWaiting, 'DeliveryPointScreen'> { }

const DeliveryPointScreen = ({ route }: Props) => {

  const { deliveryPointId, dpName } = route.params
  const setDeliveryPointId = useOrderStore(state => state.setDeliveryPointId)

  const [showFab, setShowFab] = useState(false);

  const foodStandId = useOrderStore(state => state.foodStandId);
  const foodStandName = useOrderStore(state => state.foodStandName);
  const userToken = useAuthStore(state => state.token);
  const label = useFabStore(state => state.label);
  const iconName = useFabStore(state => state.iconName);
  const backgroundColor = useFabStore(state => state.backgroundColor);


  const waitingOrders = useWaitingOrders(foodStandId, deliveryPointId);


  const { refreshing, handleRefresh } = useRefreshOnFocus(waitingOrders.refetch);

  useEffect(() => {
    setDeliveryPointId(deliveryPointId);
    console.log('setDeliveryPintId')

  }, [])

  const handleOrderStatus = () => {

    setShowFab(true);

    setTimeout(() => {
      setShowFab(false);
    }, 1500)
  }

  if (waitingOrders.isError) {
    return (
      <ErrorScreen
        message={waitingOrders.error.message ?? 'Error inesperado'}
        onRetry={waitingOrders.refetch} />
    )
  }


  return (
    <>
      <FlatList
        data={waitingOrders.data}
        initialNumToRender={5}
        style={{ backgroundColor: '#fff' }}
        keyExtractor={(item)=> item.id}
        ListHeaderComponentStyle={{ paddingTop: 15, marginBottom: 10 }}
        contentContainerStyle={{ paddingHorizontal: 20 }}
        refreshing = {refreshing}
        onRefresh={handleRefresh}
        ListHeaderComponent={
          <View>
            <Text category='h2'
              style={{ textAlign: 'center' }}
            >{dpName}</Text>
            <Text category='label'
              style={{ textAlign: 'center' }}
            >{foodStandName}</Text>
          </View>
        }
        renderItem={({ item }) => (
          <AnimatedCardWrapper>
            <OrderInfo
              style={{ marginVertical: 10 }}
              totalPrice={item.totalPrice}
              orderId={item.id}
              userName={item.user.userName}
              orderDish={item.orderDish}
              handleOrderStatus={() => handleOrderStatus()}
            />
          </AnimatedCardWrapper>
        )}
        ListEmptyComponent={
          waitingOrders.isLoading ?
            <SkeletonCard /> :
            <NoticeScreen title='Sin pedidos!' message='Descansa' />
        }
      />
      {
        showFab && (
          <FAB
            iconName={iconName}
            iconHeight={50}
            label={label}
            onPress={() => { }}
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

        )
      }
    </>
  )
}
export default DeliveryPointScreen




