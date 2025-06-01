import { FoodStandDish } from '../../domain/entities/foodStand';
import { FoodStandDishControl } from '../../domain/entities/foodStand-Dish-Control';
import { FoodStandDishControlResponse } from '../interfaces/foodStandDishControl.response';




export class FoodStandDishControlMapper {
    static foodStandDishResponseToEntity (foodStandDishControlResponse: FoodStandDishControlResponse) : FoodStandDishControl {

        return {
            id: foodStandDishControlResponse.id,
            quantity: foodStandDishControlResponse.quantity,
            is_active: foodStandDishControlResponse.is_active,
            
        }
    }
}























