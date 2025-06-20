import { foodAppApi } from "../../config/api/foodAppApi";
import { OrderByDeliveryPointResponse, OrderInfoResponse } from "../../infrastructure/interfaces/orders.response";

export function getOnRouteOrders(foodStandId: string, userId: string): Promise<OrderByDeliveryPointResponse[]>;
export function getOnRouteOrders(foodStandId: string, userId: string, deliveryPointId: string): Promise<OrderInfoResponse[]>
export async function getOnRouteOrders(
    foodStandId: string,
    userId: string,
    deliveryPointId?: string,
): Promise<OrderByDeliveryPointResponse[] | OrderInfoResponse[]> {

    const params = new URLSearchParams();
    params.append('foodStandId', foodStandId);
    if(deliveryPointId) params.append('deliveryPointId', deliveryPointId);
    try {

        if(!deliveryPointId){
            const {data} = await foodAppApi.get<OrderByDeliveryPointResponse[]>(`/order/deliveryUserOrders/${userId}?${params.toString()}`)
            return data;
        } else {
            const {data} = await foodAppApi.get<OrderInfoResponse[]>(`/order/deliveryUserOrders/${userId}?${params.toString()}`);
            return data
        }
       
    } catch (error) {
        console.log(error);
        throw new Error('Error al traer las ordenes')
    }
}