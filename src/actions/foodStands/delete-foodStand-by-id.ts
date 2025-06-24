import { isAxiosError } from "axios"
import { log } from "../../config/loggers/logger"
import { foodAppApi } from "../../config/api/foodAppApi";


export const deleteFoodStandById = async (id: string) => {

    try {
        await foodAppApi.delete(`/food-stands/${id}`)
    } catch (error) {
        if(isAxiosError(error)){
            log(error.response?.data);
        }
        throw new Error('Error borrando foodStand')
    }
}