import { isAxiosError } from "axios";
import { foodAppApi } from "../../config/api/foodAppApi"
import { log } from "../../config/loggers/logger";


export const createFoodStandDish = async(foodStandId: string, dishId: string) => {
    console.log(foodStandId, '-- foodStandId')
    console.log(dishId)
    try {
        const {data} = await foodAppApi.post(`/food-stand-dish/${foodStandId}/${dishId}`);
        return data
    } catch (error) {
        if(isAxiosError(error)){
            log(error.response?.data, 'createFoodStandDish - line 13');
        }
        throw new Error('Error creando relacion entre local y platillo')
    }

}