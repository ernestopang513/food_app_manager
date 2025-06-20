import { useQuery } from "@tanstack/react-query";
import { OrderInfoResponse } from "../../../infrastructure/interfaces/orders.response";




interface UseOrderInfo {
    queryKey: string;
    queryFunction: (params: {foodStandId:string, userId:string, deliveryPointId: string}) => Promise<OrderInfoResponse[]>;
    foodStandId: string | undefined;
    userId: string | undefined;
    deliveryPointId: string | undefined

}


export const useOrderInfo = ({queryKey, queryFunction, foodStandId, userId, deliveryPointId}: UseOrderInfo) => {
    return useQuery({
        queryKey: [queryKey, userId, foodStandId, deliveryPointId],
        queryFn: () => {
            if(!foodStandId || !userId || !deliveryPointId) throw new Error('Faltan parametros.')
            return queryFunction({foodStandId, userId, deliveryPointId})
        },
        enabled: !!foodStandId && !!userId && !!deliveryPointId,
    })
}