import { createContext, useContext, useState, useMemo, useEffect } from "react";
import { AuthProps } from "../interfaces/ContextInterfaces";
import * as SecureStore from 'expo-secure-store';


const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }: any) => {
    const [isLoading, setIsLoading] = useState(false);
    const [userToken, setUserToken] = useState<string | null>(null);
    const [role, setRole] = useState('visitor');

    const login = (email: string, password: string) => {
        setIsLoading(true);
        console.log(email, password);
        setUserToken('jhbfadsfa');
        setRole('student');
        SecureStore.setItemAsync('userToken', 'jhbfadsfa');
        setIsLoading(false);
    }

    const logout = () => {
        setIsLoading(true);
        setUserToken(null);
        setRole('visitor');
        SecureStore.deleteItemAsync('userToken');
        setIsLoading(false);
    }

    const isLoggedIn = async () => {
        try {
            setIsLoading(true);
            let userToken = await SecureStore.getItemAsync('userToken');
            setUserToken(userToken);
            setRole('student');
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
            role
        };
    }, [login, logout, isLoading, userToken, isLoggedIn]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
