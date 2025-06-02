import { foodAppApi } from "../../config/api/foodAppApi";
import { FoodStandDish } from "../../domain/entities/foodStand";
import { FoodStandDishControlMapper } from "../../infrastructure/mappers/foodStandDishControl.mapper";


export const patchFoodStandDish = async( foodStandDish: Partial<FoodStandDish> ) => {

    const {id, quantity, is_active} = foodStandDish

    

    try {
        const {data} = await foodAppApi.patch(`/food-stand-dish/${id}`, {
            increment: true,
            quantity,
            is_active
        }
        )
        return  FoodStandDishControlMapper.foodStandDishResponseToEntity(data);
        
    } catch (error) {
        console.log(error);
        throw new Error(`Error actualizando el platillo con id: ${id}`)
    }

}






































