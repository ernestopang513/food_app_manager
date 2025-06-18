import { create } from "zustand";


export interface OrderState {

    foodStandId?: string ;
    foodStandName?: string;
    deliveryPointId?: string;
    setDeliveryPointId: (id:string) => void,
    setFoodStandId: (id: string) => void;
    setFoodStandName: (id: string) => void;

}

export const useOrderStore = create<OrderState>()((set) => ({
    foodStandId: undefined,
    foodStandName: undefined,
    deliveryPointId: undefined,
    setDeliveryPointId: (id) => set({deliveryPointId: id}),
    setFoodStandId: (id) => set({foodStandId: id}),
    setFoodStandName: (name) => set({foodStandName: name}),
}))



