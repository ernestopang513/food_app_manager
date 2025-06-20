import { foodAppApi } from "../../config/api/foodAppApi";

export const updateOrderStatus = async (orderId: string, deliveryUserId: string, status: string) => {

    try {
        const data = await foodAppApi.patch(`/order/${orderId}/delivery-status`, {
            userId: deliveryUserId,
            status: status
        })
        return data
    } catch (error) {
        console.log(error);
        throw new Error(`Error al asignar repartidor a la order id: ${orderId}`)
    }

}