import { isAxiosError } from "axios";
import { foodAppApi } from "../../config/api/foodAppApi"
import { log } from "../../config/loggers/logger";


export const deleteSuperUserById = async(id: string) => {
    try {
        await foodAppApi.delete(`/auth/super-user/${id}`);
    } catch (error) {
        if(isAxiosError(error)){
            log(error.response?.data)
        }
        throw new Error('Error al eliminar usuario');
    }
}