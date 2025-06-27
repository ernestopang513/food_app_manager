import { isAxiosError } from "axios";
import { log } from "../../config/loggers/logger";
import { foodAppApi } from "../../config/api/foodAppApi";
import { DeliveryPointOrderResponse } from "../../infrastructure/interfaces/orders.response";

export const getAllDeliveryPoints = async(): Promise<DeliveryPointOrderResponse[]> => {
    try {
        const {data} = await foodAppApi.get('/delivery-point')
        return data
    } catch (error) {
        if (isAxiosError(error)) {
            log(error.response?.data, '/n', 'getAllDeliveryPoints - linea 9')
        }
        throw new Error(`Error obteniendo puntos de entrega`);
    }
}