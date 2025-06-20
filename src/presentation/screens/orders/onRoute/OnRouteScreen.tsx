import { useOrderStore } from '../../../store/orders/useOrdersStore'
import { getOnRouteOrders } from '../../../../actions/orders/get-onRoute-orders'
import { useAuthStore } from '../../../store/auth/useAuthStore'
import { useOrderByDevliveryPoint } from '../../../hooks/orders/useOrderByDeliveryPoint'
import DeliveryPointList from '../../../components/orders/DeliveryPointList'
import NoticeScreen from '../../../components/ui/NoticeScreen'
import { useFocusEffect } from '@react-navigation/native'
import { useCallback } from 'react'

const OnRouteScreen = () => {

  const foodStandId = useOrderStore(state => state.foodStandId);
  const foodStandName = useOrderStore(state => state.foodStandName);
  const id = useAuthStore(state => state.user?.id);
  
  const getOrders = ({ foodStandId, id}: {foodStandId: string, id: string}) => {
    return getOnRouteOrders(foodStandId, id);
  }

  
  
  const onRouteOrders = useOrderByDevliveryPoint({
    queryKey: 'onRouteOrdesByDeliveryPoint',
    foodStandId,
    id,
    queryFunction: getOrders,
  })
  
  useFocusEffect(
          useCallback(() => {
              onRouteOrders.refetch();
          }, [onRouteOrders.refetch])
      );

  if(!foodStandName || onRouteOrders.data?.length === 0){ 
    return (
      <NoticeScreen
        style ={{justifyContent: 'flex-start', paddingTop: 40, alignItems: 'flex-start'}}
        title='Sin ordenes para repartir'
        message='Elige un foodStand en la pesaña de local.'
      />
    )}
  
  return (
    <DeliveryPointList
     foodStandName = {foodStandName}
     isLoading = {onRouteOrders.isLoading}
     isError = {onRouteOrders.isError}
     OnRouteOrders = {onRouteOrders.data}
    />

  )
}
export default OnRouteScreen


