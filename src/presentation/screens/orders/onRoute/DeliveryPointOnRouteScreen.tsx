import { View, ScrollView } from 'react-native'
import { getOnRouteOrders } from '../../../../actions/orders/get-onRoute-orders'
import { useOrderInfo } from '../../../hooks/orders/useOrderInfo';
import { useOrderStore } from '../../../store/orders/useOrdersStore';
import { useAuthStore } from '../../../store/auth/useAuthStore';
import { StackScreenProps } from '@react-navigation/stack';
import { StackParamsOnRoute } from '../../../routes/orders/onRouteStack/OnRouteStackNavigation';
import { Layout, Text } from '@ui-kitten/components';
import OnDeliveryOrderInfo from '../../../components/orders/OnDeliveryOrderInfo';
import FAB from '../../../components/ui/FAB';

interface Props extends StackScreenProps<StackParamsOnRoute, 'DeliveryScreen'>{}

const DeliveryPointOnRouteScreen = ({route}: Props) => {

  const {deliveryPointId, dpName} = route.params;

  const foodStandId = useOrderStore(state => state.foodStandId);
  const id = useAuthStore(state => state.user?.id);
  const foodStandName = useOrderStore(state => state.foodStandName)

  const getDeliveryOrders = ({
    foodStandId, 
    id , 
    deliveryPointId
  }: {foodStandId:string, id:string, deliveryPointId:string}) => getOnRouteOrders(foodStandId,id,deliveryPointId);  

  const {data: onRouteOrders, isLoading, isError} = useOrderInfo({
    queryKey: 'OrdersForDelivery', 
    deliveryPointId, 
    id,
    foodStandId,
    queryFunction: getDeliveryOrders
  
  });



  return (
    <>
    <Layout style = {{flex: 1, paddingHorizontal: 20, paddingTop: 20}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
      >

      <Text category='h2' 
        style ={{textAlign: 'center'}}
        >{dpName}</Text>
      <Text category='label' 
        style ={{textAlign: 'center', marginBottom: 20}}
        >{foodStandName}</Text>
      {
        onRouteOrders?.map((item) => (
          // <Layout key={item.id}>
          //   <Text>{item.id}</Text>
          // </Layout>
          <OnDeliveryOrderInfo
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
      <FAB
        style ={{
          position: 'absolute',
          top: 20,
          right: 20,
        }}
        iconName='notifications-outline'
        onPress={()=>console.log('Hola')}
      />
      </>
  )
}
export default DeliveryPointOnRouteScreen






