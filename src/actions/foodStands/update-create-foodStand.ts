import { isAxiosError } from "axios";
import { foodAppApi } from "../../config/api/foodAppApi";
import { log } from "../../config/loggers/logger";
import { FoodStand } from "../../domain/entities/foodStand";
import { FoodStandMapper } from "../../infrastructure/mappers/foodStand.mapper";



export const updateCreateFoodStand = (foodStand: Partial<FoodStand>) => {

    foodStand.latitude = isNaN(Number(foodStand.latitude)) ? 0 : Number(foodStand.latitude)
    foodStand.longitude = isNaN(Number(foodStand.longitude)) ? 0 : Number(foodStand.longitude)
    if(foodStand.id && foodStand.id !== 'new') {
        log(foodStand.id)
        return updateFoodStand(foodStand);
    }
    return createFoodStand(foodStand)
}


const updateFoodStand = async(foodStand: Partial<FoodStand>) => {
    const {id, ...rest} = foodStand;
    try {
        const {data} = await foodAppApi.patch(`/food-stands/${foodStand.id}`, {
            ...rest
        })

        return FoodStandMapper.foodStandResponseSettings(data);
    } catch (error) {
        if(isAxiosError(error)) {
            log(error.response?.data)
        }
        log(error)
        throw new Error(`Error al actualizar el foodStand`)
    }
}


const createFoodStand = async(foodStand: Partial<FoodStand>) => {
    const {id, ...rest} = foodStand;

    try {
        const {data} = await foodAppApi.post('/food-stands', {
            ...rest
        })
        return data
    } catch (error) {
        if(isAxiosError(error)) {
            log(error.response?.data)
        }
        throw new Error('Error al crear el foodStand')
    }
}