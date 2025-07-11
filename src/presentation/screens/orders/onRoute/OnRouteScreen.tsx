import { useOrderStore } from '../../../store/orders/useOrdersStore'
import { getOnRouteOrders } from '../../../../actions/orders/get-onRoute-orders'
import { useAuthStore } from '../../../store/auth/useAuthStore'
import { useOrderByDevliveryPoint } from '../../../hooks/orders/useOrderByDeliveryPoint'
import DeliveryPointList from '../../../components/orders/DeliveryPointList'
import NoticeScreen from '../../../components/ui/NoticeScreen'
import { useFocusEffect } from '@react-navigation/native'
import { useCallback } from 'react'
import ErrorScreen from '../../../components/ui/ErrorScreen'

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

  if(!foodStandName ){ 
    return (
      <NoticeScreen
        style ={{justifyContent: 'flex-start', paddingTop: 40, alignItems: 'flex-start'}}
        title='Sin ordenes para repartir'
        message='Elige un foodStand en la pesaña de local.'
      />
    )}

    if (onRouteOrders.isError) {
        return (
            <ErrorScreen
                message={onRouteOrders.error.message ?? 'Error inesperado'}
                onRetry={onRouteOrders.refetch} />
        )
    }

  
  return (

    

    <DeliveryPointList
     foodStandName = {foodStandName}
     isLoading = {onRouteOrders.isLoading}
     OnRouteOrders = {onRouteOrders.data}
     refetch={onRouteOrders.refetch}
    />

  )
}
export default OnRouteScreen


