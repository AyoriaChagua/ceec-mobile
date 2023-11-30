export interface LoginResponse {
    code?: number;
    msg?: string;
    token?: string;
    possibleAttemps?: number
}

export interface LoginRequest {
    email: string;
    password: string;
}
