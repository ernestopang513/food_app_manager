import { create } from "zustand";

interface UIState {
    socketError: string | undefined;
    setSocketError: (msg: string | undefined) => void;
}


export const useUIStore = create<UIState>()((set)=> ({
    socketError: undefined,
    setSocketError: (msg) => set({socketError: msg})
}))