import { isAxiosError } from "axios";
import { log } from "../../config/loggers/logger";
import { foodAppApi } from "../../config/api/foodAppApi";
import { Dish } from "../../domain/entities/foodStand";


export const getDishById = async (id: string): Promise<Dish> => {
    try {

        const {data} = await foodAppApi.get(`/dish/${id}`)

        return data
        
    } catch (error) {
        if(isAxiosError(error)) {

            log(error.response?.data, 'getDishById: line 10')
            // throw new Error(`${JSON.stringify(error.response?.data)?? `Error obteniendo dis con el id ${id}`}`)
        } 
            throw new Error(`Error obteniendo dish con el id ${id}.`)
    }
}