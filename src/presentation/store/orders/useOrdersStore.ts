import { create } from "zustand";


export interface OrderState {

    foodStandId?: string ;
    setFoodStandId: (id: string) => void;

}

export const useOrderStore = create<OrderState>()((set) => ({
    foodStandId: undefined,

    setFoodStandId: (id) => set({foodStandId: id}),
}))



