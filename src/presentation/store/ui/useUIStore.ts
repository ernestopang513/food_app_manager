import { create } from "zustand";

interface UIState {
    socketError: string | undefined;
    mutationError: string | undefined;
    setSocketError: (msg: string | undefined) => void;
    setMutationError: (msg: string | undefined) => void;
}


export const useUIStore = create<UIState>()((set)=> ({
    socketError: undefined,
    mutationError: undefined,
    setSocketError: (msg) => set({socketError: msg}),
    setMutationError: (msg) => set({mutationError: msg}),
}))