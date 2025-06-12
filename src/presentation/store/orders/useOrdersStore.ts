import { create } from "zustand";


export interface OrderState {

    foodStandId?: string ;
    foodStandName?: string;
    setFoodStandId: (id: string) => void;
    setFoodStandName: (id: string) => void;

}

export const useOrderStore = create<OrderState>()((set) => ({
    foodStandId: undefined,
    foodStandName: undefined,
    setFoodStandId: (id) => set({foodStandId: id}),
    setFoodStandName: (name) => set({foodStandName: name}),
}))



