import { isAxiosError } from "axios"
import { log } from "../../config/loggers/logger"
import { DishResponse } from "../../infrastructure/interfaces/foodStand.response";
import { foodAppApi } from "../../config/api/foodAppApi";



export const getAllDishes = async(): Promise<DishResponse[]> => {
    try {
        const {data} = await foodAppApi.get('/dish');
        return data
    } catch (error) {
        if(isAxiosError(error)) {
            log(error.response?.data, '/n' , 'getAllDishes - linea 11')
        }
        throw new Error(`Error obteniendo platillos`);
    }
}