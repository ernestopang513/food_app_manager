import { foodAppApi } from "../../config/api/foodAppApi";
import { FoodStand } from "../../domain/entities/foodStand";
import { FoodStandMapper } from "../../infrastructure/mappers/foodStand.mapper";





export const openFoodStand = async(foodStand: Partial<FoodStand>) => {

    const {id, isOpen, name} = foodStand;

    try {
        const {data} = await foodAppApi.patch(`/food-stands/${id}`,{
            isOpen
        });    
        return FoodStandMapper.foodStandPatchResToOpenEntity(data);

    } catch (error) {
        console.log(error);
        throw new Error(`Error abriendo/cerrando el foodStan ${name}`)
    }
}