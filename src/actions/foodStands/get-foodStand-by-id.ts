import { foodAppApi } from "../../config/api/foodAppApi";
import { FoodStand } from "../../domain/entities/foodStand";
import { FoodStandResponse } from "../../infrastructure/interfaces/foodStand.response";
import { FoodStandMapper } from "../../infrastructure/mappers/foodStand.mapper";



export const getFoodStandById = async (id: string): Promise<FoodStand | undefined>  => {

    try {
        const {data} =await foodAppApi.get<FoodStandResponse>(`/food-stands/${id}`);

        const foodStand =  FoodStandMapper.foodStantResponseToEntity(data);
        if(!foodStand) {
            throw new Error(`El Food Stand con id ${id} no tiene platillos registrados.`);
        }

        return foodStand;

    } catch (error) {
        console.log(error)
        throw new Error(`Error obteniendo el food stand con el id: ${id}`)
    }
}



