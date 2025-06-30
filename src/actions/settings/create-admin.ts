import { AxiosError, isAxiosError } from "axios";
import { SuperUser } from "../../presentation/screens/settings/adminSettings/CreateAdminScreen";
import { log } from "../../config/loggers/logger";
import { foodAppApi } from "../../config/api/foodAppApi";

export const createAdmin = async(adminUser: SuperUser) => {
    const {confirmPassword, ...rest} = adminUser;
    console.log(rest)
    try {
        const {data} = await foodAppApi.post('/auth/register-admin', {
            ...rest
        })
        return data
    } catch (error) {
        if(isAxiosError(error)){
            log(error.response?.data, 'createAdmin - line 10')
        }
        throw new Error('Error al crear usuario');
    }
}