export interface OrderByDeliveryPointResponse {
    deliveryPoint: DeliveryPointOrderResponse;
    orders:        number;
}

export interface DeliveryPointOrderResponse {
    id:        string;
    name:      string;
    latitude:  number;
    longitude: number;
    is_active: boolean;
}


export interface OrderInfoResponse {
    id:                   string;
    totalPrice:           number;
    status:               string;
    paymentMethod:        string;
    estimatedTimeMinutes: number;
    createdAt:            Date;
    foodStandId:          string;
    orderDish:            OrderDishResponse[];
    deliveryPoint:        DeliveryPointOrderResponse;
    user:                 UserOrderResponse;
    deliveryUser:         null;
}


export interface OrderDishResponse {
    id:       string;
    quantity: number;
    subtotal: number;
    dish:     DishOrderResponse;
}

export interface DishOrderResponse {
    id:          string;
    price:       number;
    name:        string;
    description: string;
}

export interface UserOrderResponse {
    id:       string;
    email:    string;
    userName: string;
    fullName: string;
    isActive: boolean;
    role:     string;
}
