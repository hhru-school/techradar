interface ErrorResponseData {
    message: string;
    status: string;
    timestamp: string;
}

export interface ErrorResponse {
    data: ErrorResponseData;
    status: number;
}

export interface SignInResponse {
    typeToken: string;
    accessToken: string;
    refreshToken: string;
}

export interface SignInValues {
    username: string;
    password: string;
}

export interface ServerResponse {
    username: string | null;
    accessToken: string | null;
    refreshToken: string | null;
}

export interface SignUpValues {
    username: string;
    password: string;
    confirmPassword: string;
}

export interface SignUpResponse {
    message: string;
}
