import { foodAppApi } from "../../config/api/foodAppApi"
import { OrderByDeliveryPointResponse, OrderInfoResponse } from '../../infrastructure/interfaces/orders.response';



// export const getWaitingOrders = async(foodStandId?: string | undefined, deliveryPointId?: string | undefined) => {
    
//     if (!foodStandId && !deliveryPointId) {
//         throw new Error(`Se requiere foodStandId o deliveryPointId`);
//     }

//     let query = `foodStandId=${foodStandId}`
//     if(deliveryPointId) {
//         query = query + `&deliveryPointId=${deliveryPointId}`
//     }
//     // let query = '';

//     // if (foodStandId) {
//     //     query = `foodStandId=${foodStandId}`;
//     // }else if (deliveryPointId) {
//     //     query = `deliveryPointId=${deliveryPointId}`;
//     // }


//     try {

//         if (!deliveryPointId){

//             const {data: waitingOrders} = await foodAppApi.get<WaitingOrderByDeliveryPointResponse[]>(`/order/waiting?${query}`);

//             return waitingOrders;
//         }
        
//         const {data: waitingOrders} = await foodAppApi.get<WaitingOrderInfoResponse[]>(`/order/waiting?${query}`);

//         return waitingOrders;
        



//     } catch (error) {
//         console.log(error)
//         throw new Error(`Error obteniendo ordenes en espera`)
//     }


// }


export function getWaitingOrders(foodStandId: string): Promise<OrderByDeliveryPointResponse[]>;
export function getWaitingOrders(foodStandId: string, deliveryPointId: string): Promise<OrderInfoResponse[]>;
export async function getWaitingOrders (
    foodStandId: string,
    deliveryPointId?: string
): Promise<OrderByDeliveryPointResponse[] | OrderInfoResponse[]> {

    // if(!foodStandId) throw new Error('El foodStandId es obligatorio.')

    const params = new URLSearchParams();
    params.append('foodStandId', foodStandId);
    if(deliveryPointId) params.append('deliveryPointId', deliveryPointId);

    try {
        const url = `/order/waiting?${params.toString()}`;

        if (deliveryPointId) {
            const {data} = await foodAppApi.get<OrderByDeliveryPointResponse[]>(url);
            return data;
        } else {
            const {data} = await foodAppApi.get<OrderInfoResponse[]>(url);
            return data;
        }

    } catch (error) {
        console.log(error);
        throw new Error('Error obteniendo ordenes en espera');
    }
}









