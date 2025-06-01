import { foodAppApi } from "../../config/api/foodAppApi";
import { FoodStandDishControlMapper } from "../../infrastructure/mappers/foodStandDishControl.mapper";


export const patchFoodStandDish = async(id: string = '4c5bef84-8b9c-49fe-a568-92213fde66d5', increment: boolean= true , quantity: number =1, is_active: boolean ) => {


    try {
        const {data} = await foodAppApi.patch(`/food-stand-dish/${id}`, {
            increment,
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






































