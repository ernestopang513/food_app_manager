import { foodAppApi } from "../../config/api/foodAppApi";



export const cancelOrderDeliverUser = async (orderId: string) => {

    try {
        const data = await foodAppApi.patch(`/order/${orderId}/cancelByDeliveryUser`)
        return data
    } catch (error) {
        console.log(error);
        throw new Error(`Error al asignar repartidor a la order id: ${orderId}`)
    }

}