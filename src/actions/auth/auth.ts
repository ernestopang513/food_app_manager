import { API_URL_LOCAL, foodAppApi } from "../../config/api/foodAppApi";
import { User } from "../../domain/entities/user";
import type { AuthResponse } from "../../infrastructure/interfaces/auth.responses";



const returnUserToken = (data: AuthResponse) => {
    const user: User = {
        id: data.id,
        email: data.email
    }

    return {
        user: user,
        token: data.token,
    }
}

export const authLogin = async (email:string, password: string) => {

    email = email.toLowerCase();

    try {
        const { data } = await foodAppApi.post<AuthResponse>('/auth/login', {
            email,
            password,
        });
        return returnUserToken(data);

    } catch (error) {
        console.log(error);
        return null
    }
} 


export const authCheckStatus = async () => {
    try{
        const {data} = await foodAppApi.get<AuthResponse>('/auth/check-status');
        return returnUserToken(data);
    } catch (error) {
        console.log({error})
        return null
    }
}
