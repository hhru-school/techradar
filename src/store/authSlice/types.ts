export interface AuthState {
    showAuthForm: boolean;
    showRegistrForm: boolean;
    username: string | null;
    password: string | null;
    accessToken: string | null;
    refreshToken: string | null;
}
