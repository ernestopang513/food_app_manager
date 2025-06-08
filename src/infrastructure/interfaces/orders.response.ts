export interface WaitingOrderResponse {
    deliveryPoint: DeliveryPoint;
    orders:        Order[];
}

export interface DeliveryPoint {
    id:        string;
    name:      string;
    latitude:  number;
    longitude: number;
    is_active: boolean;
}


export interface Order {
    id:                   string;
    totalPrice:           number;
    status:               string;
    paymentMethod:        string;
    estimatedTimeMinutes: number;
    createdAt:            Date;
    orderDish:            OrderDishOrderResp[];
    deliveryPoint:        DeliveryPoint;
    user:                 UserOrderResp;
    deliveryUser:         null;
}

export interface OrderDishOrderResp {
    id:       string;
    quantity: number;
    subtotal: number;
    dish:     DishOrderResp;
}

export interface DishOrderResp {
    id:          string;
    price:       number;
    name:        string;
    description: string;
}



export interface UserOrderResp {
    id:       string;
    email:    string;
    userName: string;
    fullName: string;
    isActive: boolean;
    role:     string;
}

