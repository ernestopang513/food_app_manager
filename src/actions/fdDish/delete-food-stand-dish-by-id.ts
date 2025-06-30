import { isAxiosError } from "axios"
import { foodAppApi } from "../../config/api/foodAppApi"
import { log } from "../../config/loggers/logger"

export const deleteFoodStandDishById = async(foodStandDishId: string) => {
    console.log(foodStandDishId, '- foodStandId');
    try {
        await foodAppApi.delete(`/food-stand-dish/${foodStandDishId}`)
    } catch (error) {
        if(isAxiosError(error)){
            log(error.response?.data, 'deleteFoodStandDishById - line 10');
        }
        throw new Error('Error eliminando la relacion local - platillo')
    }
}