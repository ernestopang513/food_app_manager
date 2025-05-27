export interface FoodStand {
    id:              string;
    name:            string;
    location:        string;
    latitude:        number;
    longitude:       number;
    isOpen:          boolean;
    createdAt:       Date;
    foodStandDishes: FoodStandDish[];
}

export interface FoodStandDish {
    id:        string;
    quantity:  number;
    is_active: boolean;
    dish:      Dish;
}

export interface Dish {
    id:          string;
    price:       number;
    name:        string;
    description: string;
}
