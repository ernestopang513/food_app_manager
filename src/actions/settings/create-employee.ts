import { AxiosError, isAxiosError } from "axios";
import { SuperUser } from "../../presentation/screens/settings/adminSettings/CreateAdminScreen";
import { log } from "../../config/loggers/logger";
import { foodAppApi } from "../../config/api/foodAppApi";

export const createEmployee = async(employeeUser: SuperUser) => {
    const {confirmPassword, adminKey ,...rest} = employeeUser;
    
    console.log(rest)
    try {
        const {data} = await foodAppApi.post('/auth/register-employee', {
            ...rest,
            employeeKey: adminKey,
        })
        return data
    } catch (error) {
        if(isAxiosError(error)){
            log(error.response?.data, 'createEmployee - line 10')
        }
        throw new Error('Error al crear usuario');
    }
}