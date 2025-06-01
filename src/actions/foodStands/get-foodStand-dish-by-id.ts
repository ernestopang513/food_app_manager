import { foodAppApi } from "../../config/api/foodAppApi";
import { FoodStandDish } from "../../domain/entities/foodStand";
import { FoodStandDishControl } from "../../domain/entities/foodStand-Dish-Control";
import { FoodStandDishResponse } from "../../infrastructure/interfaces/foodStand.response";
import { FoodStandDishControlResponse } from "../../infrastructure/interfaces/foodStandDishControl.response";
import { FoodStandDishControlMapper } from "../../infrastructure/mappers/foodStandDishControl.mapper";







export const getFoodStandDishById = async(id: string): Promise<FoodStandDish> => {

    try {
        const {data} = await foodAppApi.get<FoodStandDishResponse>(`/food-stand-dish/${id}`);

        return FoodStandDishControlMapper.foodStandDishResponseToEntity(data);

    } catch (error) {
        console.log(error)
        throw new Error(`Error obteniendo el food stand dish con id: ${id}`)
    }
}