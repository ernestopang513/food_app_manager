import { isAxiosError } from "axios"
import { foodAppApi } from "../../config/api/foodAppApi"
import { log } from "../../config/loggers/logger"



export const deleteDishById = async (id:string) => {
    try {
        await foodAppApi.delete(`/dish/${id}`)
    } catch (error) {
        if(isAxiosError(error)){
            log(error.response?.data, 'deleteDishById - liena 11' )
        }
        throw new Error('Error borrando platillo');
    }
}