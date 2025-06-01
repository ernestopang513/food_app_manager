import { FoodStandDish } from '../../domain/entities/foodStand';
import { FoodStandDishControl } from '../../domain/entities/foodStand-Dish-Control';
import { FoodStandDishResponse } from '../interfaces/foodStand.response';
import { FoodStandDishControlResponse } from '../interfaces/foodStandDishControl.response';




export class FoodStandDishControlMapper {
    static foodStandDishResponseToEntity (foodStandDishResponse: FoodStandDishResponse) : FoodStandDish {

        return {
            id: foodStandDishResponse.id,
            quantity: foodStandDishResponse.quantity,
            is_active: foodStandDishResponse.is_active,
            dish: foodStandDishResponse.dish
            
        }
    }
}























