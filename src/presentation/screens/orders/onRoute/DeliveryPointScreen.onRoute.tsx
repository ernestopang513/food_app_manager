import { View, ScrollView, FlatList } from 'react-native'
import { getOnRouteOrders } from '../../../../actions/orders/get-onRoute-orders'
import { useOrderInfo } from '../../../hooks/orders/useOrderInfo';
import { useOrderStore } from '../../../store/orders/useOrdersStore';
import { useAuthStore } from '../../../store/auth/useAuthStore';
import { StackScreenProps } from '@react-navigation/stack';
import { StackParamsOnRoute } from '../../../routes/orders/onRouteStack/OnRouteStackNavigation';
import { Layout, Text } from '@ui-kitten/components';
import OnDeliveryOrderInfo from '../../../components/orders/OnDeliveryOrderInfo';
import FAB from '../../../components/ui/FAB';
import AnimatedCardWrapper from '../../../components/ui/animations/AnimatedCardWrapper';
import SkeletonCard from '../../../components/ui/SkeletonCard';
import ErrorScreen from '../../../components/ui/ErrorScreen';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useFabStore } from '../../../store/orders/useFabStore';
import { log } from '../../../../config/loggers/logger';
import NoticeScreen from '../../../components/ui/NoticeScreen';

interface Props extends StackScreenProps<StackParamsOnRoute, 'DeliveryScreen'>{}

const DeliveryPointOnRouteScreen = ({route, navigation}: Props) => {

  const {deliveryPointId, dpName} = route.params;

  const [showFab, setShowFab] = useState(false);///////////

  const hasLoadedOnce = useRef(false);

  const foodStandId = useOrderStore(state => state.foodStandId);
  const userId = useAuthStore(state => state.user?.id);
  const foodStandName = useOrderStore(state => state.foodStandName);
  const label = useFabStore(state => state.label);
  const iconName = useFabStore(state => state.iconName);
  const backgroundColor = useFabStore(state => state.backgroundColor);

  const handleOrderStatus = () => {
    setShowFab(true);
    // refetch();////////////////////
    setTimeout(()=>{
      setShowFab(false);
    }, 550)
  }

  
  const getDeliveryOrders = ({
    foodStandId, 
    userId , 
    deliveryPointId
  }: {foodStandId:string, userId:string, deliveryPointId:string}) => getOnRouteOrders(foodStandId,userId,deliveryPointId);  
  
  const {data: onRouteOrders, isLoading, isError, error, refetch, isSuccess} = useOrderInfo({
    queryKey: 'OrdersForDelivery', 
    deliveryPointId, 
    userId,
    foodStandId,
    queryFunction: getDeliveryOrders
  });
  
  useFocusEffect(
            useCallback(() => {
                refetch();
            }, [refetch])
        );

//   useEffect(() => {
//   if (isSuccess && onRouteOrders && onRouteOrders.length === 0) {
//     navigation.goBack();
//   }
// }, [isSuccess, onRouteOrders, navigation]);
  
  return (
    <>
       <FlatList
        data={onRouteOrders}
        initialNumToRender={5}
        style={{ backgroundColor: '#fff' }}
        keyExtractor={(item)=> item.id}
        ListHeaderComponentStyle={{ paddingTop: 15, marginBottom: 10 }}
        contentContainerStyle={{ paddingHorizontal: 20 }}
        // refreshing = {refreshing}
        // onRefresh={handleRefresh}
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
          <AnimatedCardWrapper
              >
                <OnDeliveryOrderInfo
                  style={{ marginVertical: 10 }}
                  totalPrice={item.totalPrice}
                  deliveryPointId={deliveryPointId}
                  orderId={item.id}
                  userName={item.user.userName}
                  orderDish={item.orderDish}
                  handleOrderStatus={handleOrderStatus}
                />
              </AnimatedCardWrapper>
        )}
        ListEmptyComponent={
          isLoading ?
            <SkeletonCard /> :
            <NoticeScreen title='Sin pedidos!' message='Descansa' />
        }
      />
      <FAB
        style ={{
          position: 'absolute',
          top: 20,
          right: 20,
        }}
        iconName='notifications-outline'
        onPress={()=>console.log('Hola')}
      />
      {
        showFab &&
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
    }
      </>
  )
}
export default DeliveryPointOnRouteScreen






