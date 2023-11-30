import { createContext, useContext, useState, useMemo, useEffect } from "react";
import { AuthProps } from "../interfaces/ContextInterfaces";
import * as SecureStore from 'expo-secure-store';
import { loginService } from "../services/auth.service";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { LoginResponse } from "../interfaces/AuthInterfaces";

const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }: any) => {
    const [isLoading, setIsLoading] = useState(false);
    const [userToken, setUserToken] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [userInfo, setUserInfo] = useState<{
        id: number,
        role: number,
        email: string
    } | string | null>(null);

    const login = async (email: string, password: string) => {
        setIsLoading(true);
        try {
            const response: LoginResponse = await loginService({ email, password });
            if (response.token) {
                const decodedToken: { id: number; role: number; email: string; } = jwtDecode(response.token);
                setUserToken(response.token);
                setUserInfo({ id: decodedToken.id, role: decodedToken.role, email: decodedToken.email });
                SecureStore.setItemAsync('userToken', response.token);
                SecureStore.setItemAsync('userInfo', JSON.stringify(userInfo));
                axios.defaults.headers.common['Authorization'] = response.token;
            } else {
                setError(response.msg ?? 'Hubo un problema al iniciar sesión. Por favor, inténtalo de nuevo.');
            }
        } catch (error) {
            console.error('Error en el proceso de inicio de sesión:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        setIsLoading(true);
        setUserToken(null);
        SecureStore.deleteItemAsync('userToken');
        SecureStore.deleteItemAsync('userInfo');
        setIsLoading(false);
    }

    const isLoggedIn = async () => {
        try {
            setIsLoading(true);
            let userToken = await SecureStore.getItemAsync('userToken');
            let userInfo = await SecureStore.getItemAsync('userInfo');
            userInfo = JSON.parse(userInfo!);
            if (userInfo) {
                setUserToken(userToken);
                setUserInfo(userInfo);
            }
            setIsLoading(false);
        } catch (error) {
            console.error(error);
            throw error
        }
    }

    useEffect(() => {
        isLoggedIn();
    }, []);

    const value = useMemo(() => {
        return {
            onLogin: login,
            onLogout: logout,
            isLoading,
            userToken,
            isLoggedIn,
            error,
            userInfo
        };
    }, [login, logout, isLoading, userToken, isLoggedIn, error, userInfo]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
