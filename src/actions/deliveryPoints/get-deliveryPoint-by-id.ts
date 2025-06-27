import { isAxiosError } from "axios"
import { log } from "../../config/loggers/logger"
import { foodAppApi } from "../../config/api/foodAppApi"
import { DeliveryPoint } from "../../domain/entities/deliveryPoint"



export const getDeliveryPointById = async(id: string): Promise<DeliveryPoint> => {
    try {
        const {data} = await foodAppApi.get(`/delivery-point/${id}`)
        return data
    } catch (error) {
        if(isAxiosError(error)) {
            log(error.response?.data, 'get deliveryPointById: line 10');
        }
        throw new Error(`Error obteniendo delivery point con el id: ${id}`)
    }
}