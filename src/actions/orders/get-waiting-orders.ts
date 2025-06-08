import { foodAppApi } from "../../config/api/foodAppApi"
import { WaitingOrderResponse } from "../../infrastructure/interfaces/orders.response";



export const getWaitingOrders = async() => {

    try {

        const {data: waitingOrders} = await foodAppApi.get<WaitingOrderResponse[]>(`/order/waiting`);

        return waitingOrders;

    } catch (error) {
        console.log(error)
        throw new Error(`Error obteniendo ordenes en espera`)
    }


}








