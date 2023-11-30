export interface AuthProps {
    userToken?: string | null
    onLogin?: (email: string, password: string) => void;
    onLogout?: () => void;
    errorMessage?: string | null;
    isLoading?: boolean;
    isLoggedIn?: () => Promise<void> | undefined;
    role?: string,
}