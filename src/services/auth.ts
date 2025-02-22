import { AxiosError } from "axios";
import api from "./api";

interface loginData {
    username: string;
    password: string;
}

interface LoginResponse {
    token: string;
    user: {
        id: number;
        name: string;
        email: string;
    };
}

export const login = async (credentials: loginData): Promise<LoginResponse> => {
    try {
        const response = await api.post("login", credentials);
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError<{ message: string }>;
        if (axiosError.response?.data?.message) {
            throw new Error(axiosError.response.data.message);
        }

        // Caso contrário, retorna um erro genérico
        throw new Error("Erro ao fazer login. Tente novamente.");
    }
}