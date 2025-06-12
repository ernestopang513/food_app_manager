import { useQuery } from "@tanstack/react-query"
import { OrderByDeliveryPointResponse } from "../../../infrastructure/interfaces/orders.response"


export const useOrderByDevliveryPoint = (
    queryKey: string,
    queryFunction: (param1:string, param2:string) => Promise<OrderByDeliveryPointResponse>,
    foodStandId: string,
    id: string,
) => {
    return useQuery({
        queryKey: [queryKey, foodStandId],
        queryFn: () => {
            if(!foodStandId) throw new Error('Faltan parametros')
            return queryFunction(foodStandId, id);
        },
        enabled: !!foodStandId && !!id,
        

    })
}