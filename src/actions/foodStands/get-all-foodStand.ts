import { foodAppApi } from "../../config/api/foodAppApi";
import { FoodStand } from "../../domain/entities/foodStand";
import { FoodStandResponse } from "../../infrastructure/interfaces/foodStand.response";
import { FoodStandMapper } from "../../infrastructure/mappers/foodStand.mapper";





export const getAllFoodStandsWithDishes = async(): Promise<FoodStand[]> => {

    try {
        const {data} = await foodAppApi.get<FoodStandResponse[]>(`/food-stands`);

        const foodStands = data
            .map(FoodStandMapper.foodStantResponseToEntity)
            .filter((fs): fs is FoodStand => fs !== undefined)
        return foodStands;
    } catch (error) {
        console.log(error);
        throw new Error('Error getting food stands')
    }

}