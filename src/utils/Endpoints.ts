import { Platform } from "react-native";

export const API_AUTH_URL = Platform.OS === 'ios' ?
    'http://localhost:3000/api/auth/signin' :
    'http://192.168.0.11:3000/api/auth/signin';

export const API_SOCKET_URL = Platform.OS === 'ios' ?
    'http://localhost:4100' :
    'http://192.168.0.11:4100';