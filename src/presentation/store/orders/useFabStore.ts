import { create } from "zustand";


export interface FabState {
    backgroundColor?: string;
    label?: string;
    iconName?: string;
    setIconName: (name: string) => void,
    setLabel: (label: string) => void,
    setBackgroundColor: (color: string) => void
}


export const useFabStore = create<FabState>()((set) => ({
    backgroundColor: undefined,
    label: undefined,
    iconName: undefined,
    setIconName: (iconName) => set({iconName: iconName}),
    setLabel: (label) => set({label: label}),
    setBackgroundColor: (color) => set({backgroundColor: color})
}))