import { useQuery } from "@tanstack/react-query";
import { OrderInfoResponse } from "../../../infrastructure/interfaces/orders.response";




interface UseOrderInfo {
    queryKey: string;
    queryFunction: (params: {foodStandId:string, id:string, deliveryPointId: string}) => Promise<OrderInfoResponse[]>;
    foodStandId: string | undefined;
    id: string | undefined;
    deliveryPointId: string | undefined

}


export const useOrderInfo = ({queryKey, queryFunction, foodStandId, id, deliveryPointId}: UseOrderInfo) => {
    return useQuery({
        queryKey: [queryKey, foodStandId, deliveryPointId],
        queryFn: () => {
            if(!foodStandId || !id || !deliveryPointId) throw new Error('Faltan parametros.')
            return queryFunction({foodStandId, id, deliveryPointId})
        },
        enabled: !!foodStandId && !!id && !!deliveryPointId,
    })
}