import { isAxiosError } from "axios";
import { foodAppApi } from "../../config/api/foodAppApi";
import { Dish } from "../../domain/entities/foodStand";
import { log } from "../../config/loggers/logger";

export const updateCreateDish = (dish: Partial<Dish>) => {
    dish.price = isNaN(Number(dish.price)) ? 0 : Number(dish.price)

    if(dish.id && dish.id !=='new') {
        return updateDish(dish);
    }
    return createDish(dish);
}

const updateDish = async (dish: Partial<Dish>): Promise<Dish> => {
    const {id, ...rest} = dish;
    try {
        const {data} = await foodAppApi.patch(`/dish/${dish.id}`, {
            ...rest
        });
        return data;
    } catch (error) {
        if(isAxiosError(error)) {
            log(error.response?.data, 'updateDish - linea 23');
        }
        throw new Error(`Error actualizando patillo`);
    }
}


const createDish = async(dish: Partial<Dish>): Promise<Dish> => {
    const {id, ...rest} = dish;
    try {
        const {data} = await foodAppApi.post('/dish', {
            ...rest
        })
        return data;
    } catch (error) {
        if(isAxiosError(error)) {
            log(error.response?.data);
        }
        throw new Error(`Error creando platillo`)
    }
}