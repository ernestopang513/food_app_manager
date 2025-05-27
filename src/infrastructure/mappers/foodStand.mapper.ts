import { FoodStand, FoodStandDish } from '../../domain/entities/foodStand';
import { FoodStandResponse } from '../interfaces/foodStand.response';



export class FoodStandMapper {

    static foodStantResponseToEntity (foodStandResponse: FoodStandResponse): FoodStand | undefined {

        if (!foodStandResponse.foodStandDishes || foodStandResponse.foodStandDishes.length === 0 ) return undefined;

        return {

            id: foodStandResponse.id,
            name: foodStandResponse.name,
            location: foodStandResponse.location,
            latitude: foodStandResponse.latitude,
            longitude: foodStandResponse.longitude,
            isOpen: foodStandResponse.isOpen,
            createdAt: foodStandResponse.createdAt,
            foodStandDishes: foodStandResponse.foodStandDishes


        }
    }

}