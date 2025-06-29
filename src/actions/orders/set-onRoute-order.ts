import { foodAppApi } from "../../config/api/foodAppApi";



export const setOnRouteOrder = async (orderId: string, deliveryUserId: string) => {

    try {
        const data = await foodAppApi.patch(`/order/${orderId}/delivery-status`, {
            userId: deliveryUserId
        })
        return data
    } catch (error) {
        console.log(error);
        throw new Error(`Error al asignar repartidor a la order id: ${orderId}`)
    }

}