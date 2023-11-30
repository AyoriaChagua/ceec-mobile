export interface AuthProps {
    userToken?: string | null;
    onLogin?: (email: string, password: string) => any;
    onLogout?: () => void;
    isLoading?: boolean;
    error?: string | null;
    userInfo?: {
        id: number,
        role: number,
        email: string
    } | string | null
}