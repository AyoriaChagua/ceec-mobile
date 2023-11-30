import { LoginResponse, LoginRequest } from "../interfaces/AuthInterfaces";
import { Platform } from "react-native";
import axios, { AxiosError } from 'axios';


export const loginService = async ({ email, password }: LoginRequest): Promise<LoginResponse> => {
    const API_BASE_URL = Platform.OS === 'ios' ?
        'http://localhost:3000/api/auth/signin' :
        'http://192.168.0.11:3000/api/auth/signin';
    try {
        const response = await axios.post(API_BASE_URL, { email, password });
        return response.data
    } catch (error) {
        const axiosError = error as AxiosError<LoginResponse>
        if (axiosError.response?.status === 401) {
            return axiosError.response.data;
        }
        console.error("Error in login Service:", error);
        throw error
    }
};