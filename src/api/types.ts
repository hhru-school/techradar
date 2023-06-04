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
export interface RadarApiDataResponse {
    blipEventId: number | null;
    radar: {
        id: number;
        name: string;
        authorId: number;
        companyId: number;
    };
    quadrants: {
        id: number;
        name: string;
        position: number;
        radarId: number;
    }[];
    rings: {
        id: number;
        name: string;
        position: number;
        radarId: number;
    }[];
    blips: {
        id: number;
        name: string;
        description: string;
        quadrantId: number;
        ringId: number;
        radarId: number;
    }[];
}

export interface CreateRadarVersionDataApi {
    name: string;
    release: boolean;
    radarId: number;
    blipEventId: number;
}

export interface CreateBlipApiRequest {
    name: string;
    description: string;
    radarId: number;
}

export interface CreateBlipApiResponse {
    id: number;
    name: string;
    description: string;
    radarId: number;
}

export interface CreateVersionApiRequest {
    name: string;
    release: boolean;
    radarId: number;
    blipEventId: number;
}

export interface VersionApiResponse {
    id: number;
    name: string;
    release: boolean;
    radarId: number;
    blipEventId: number;
    creationTime: string;
    lastChangeTime: string;
    toggleAvailable: boolean;
}

export interface CreateBlipEventApiRequest {
    comment: string | null;
    parentId: number;
    blipId: number;
    quadrantId: number | null;
    ringId: number | null;
    authorId: number;
    radarId: number;
}

export interface CreateBlipEventApiResponse {
    id: number;
    comment: string;
    parentId: number;
    creationTime: string;
    lastChangeTime: string;
}

export interface UpdateVersionRequest {
    id: number;
    name: string;
    release?: boolean;
    radarId?: number;
    blipEventId?: number;
}

export interface IndexBlipEventApi {
    id: number;
    comment: string;
    blipId: number;
    quadrantId?: number;
    ringId?: number;
    authorId: number;
    creationTime: string;
    lastChangeTime: string;
}

export interface RenameContainerItemApi {
    id: number;
    name: string;
    position: number;
}

export interface UpdateRadarApiRequest {
    id: number;
    name: string;
}

export interface UpdateRadarApiResponse {
    id: number;
    name: string;
    authorId: number;
    companyId: number;
}
