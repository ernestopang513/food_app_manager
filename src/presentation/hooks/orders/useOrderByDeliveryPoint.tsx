import { useQuery } from "@tanstack/react-query"
import { OrderByDeliveryPointResponse } from "../../../infrastructure/interfaces/orders.response"

interface UseOrderByDeliveryPointParams {
    queryKey: string;
    queryFunction: (params: {foodStandId:string, id:string}) => Promise<OrderByDeliveryPointResponse[]>;
    foodStandId: string | undefined;
    id: string | undefined;
}

export const useOrderByDevliveryPoint = ({queryKey, queryFunction, foodStandId, id}: UseOrderByDeliveryPointParams) => {
    return useQuery({
        queryKey: [queryKey, foodStandId],
        queryFn: () => {
            if(!foodStandId || !id) throw new Error('Faltan parametros')
            return queryFunction({foodStandId, id});
        },
        enabled: !!foodStandId && !!id,
        

    })
}