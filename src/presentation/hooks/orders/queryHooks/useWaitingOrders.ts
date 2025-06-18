import { useQueryClient, useQuery } from '@tanstack/react-query';
import { View, Text } from 'react-native'
import { getWaitingOrders } from '../../../../actions/orders/get-waiting-orders';

const useWaitingOrders = (foodStandId: string | undefined, deliveryPointId :string | undefined) => {
    return (
        useQuery({
            queryKey: [`waitingOrders-${deliveryPointId}`],
            queryFn: () => {
                if (!foodStandId || !deliveryPointId) throw new Error('Faltan parametros')
                return getWaitingOrders(foodStandId, deliveryPointId)
            },
            staleTime: 0,
            
        })
    )
}
export default useWaitingOrders

