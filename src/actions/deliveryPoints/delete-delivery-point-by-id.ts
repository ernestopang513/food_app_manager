import { isAxiosError } from "axios";
import { foodAppApi } from "../../config/api/foodAppApi"
import { log } from "../../config/loggers/logger";

export const deleteDeliveryPointById = async(id: string) => {
    try {
        await foodAppApi.delete(`/delivery-point/${id}`);
    } catch (error) {
        if(isAxiosError(error)){
            log(error.response?.data) 
        }
        throw new Error('Error eliminando punto de entrega')
    }
}