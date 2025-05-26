import { API_URL, API_URL_ANDROID, API_URL_IOS, STAGE } from "@env";
import axios from "axios";
import { Platform } from "react-native";
import { StorageAdapter } from "../adapters/storage-adapter";

export const API_URL_LOCAL = 
    (STAGE === 'prod')
        ? API_URL
        : Platform.OS === 'ios'
            ? API_URL_IOS
            : API_URL_ANDROID;


const foodAppApi = axios.create({
    baseURL: API_URL_LOCAL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 3000,
})


// Interceptors
foodAppApi.interceptors.request.use(
    async (config) => {
        const token = await StorageAdapter.getItem('token')

        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`
        }

        

        return config
    }
)

// Se exporta de esta forma para asegurar que los interceptores se cargan

export {
    foodAppApi,
}