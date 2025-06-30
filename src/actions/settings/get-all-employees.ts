import { foodAppApi } from "../../config/api/foodAppApi"
import { User } from "../../domain/entities/user";

interface AdminResponse {
    id:       string;
    email:    string;
    userName: string;
    fullName: string;
    isActive: boolean;
    role:     string;
}


export const getAllEmployees = async(): Promise<AdminResponse[]> => {
    try {
        const {data} = await foodAppApi.get('/auth/employees');
        return data
    } catch (error) {
        throw new Error('Error obteniendo datos')        
    }
}