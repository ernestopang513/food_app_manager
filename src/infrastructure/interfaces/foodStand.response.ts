export interface FoodStandResponse {
    id:              string;
    name:            string;
    location:        string;
    latitude:        number;
    longitude:       number;
    isOpen:          boolean;
    createdAt:       Date;
    foodStandDishes: FoodStandDishResponse[];
}

export interface FoodStandDishResponse {
    id:        string;
    quantity:  number;
    is_active: boolean;
    dish:      DishResponse;
}

export interface DishResponse {
    id:          string;
    price:       number;
    name:        string;
    description: string;
}
