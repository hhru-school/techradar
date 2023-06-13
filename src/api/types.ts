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

export interface CreateBlipEventApiRequestParams {
    body: CreateBlipEventApiRequest;
    versionId: number;
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
    parentId: number;
    blip: {
        id: number;
        name: string;
        description: string;
        radarId: number;
    } | null;
    quadrant: {
        id: number;
        name: string;
        position: number;
    } | null;
    ring: {
        id: number;
        name: string;
        position: number;
    } | null;
    author: {
        id: number;
        username: string;
    };
    creationTime: string;
    lastChangeTime: string;
}

export interface VersionData {
    id: number;
    name: string;
    release: boolean | string;
    radarId: number;
    blipEventId: number;
    creationTime: string | Date;
    lastChangeTime: string | Date;
}

export interface NewVersionResponse {
    id: number;
    name: string;
    release: boolean;
    radarId: number;
    blipEventId: number;
    parentId: number;
    level: number;
    toggleAvailable: boolean;
    creationTime: string | Date;
    lastChangeTime: string | Date;
}

export interface NewVersionRequest {
    name: string;
    release: boolean;
    radarId: number;
    blipEventId?: number;
}
export interface NewVersionError {
    error: string;
    status: string;
}

export interface BlipResponse {
    id: number;
    name: string;
    description: string;
    radarId: number;
}

export interface UpdateBlipRequest {
    blipId: number;
    body: { name: string; description: string; id?: number; radarId?: number };
}

export type RadarVersionData = Array<VersionData>;

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

export enum ErrorType {
    BadCredentials = 'BAD_CREDENTIALS',
    ConstraintViolation = 'CONSTRAINT_VIOLATION',
    EntityExists = 'ENTITY_EXISTS',
    NotFound = 'NOT_FOUND',
    Param = 'PARAM',
    Unique = 'UNIQUE',
    Unauthorized = 'UNAUTHORIZED',
    Base = 'BASE',
}

export interface ErrorWithTypeData {
    message: string;
    status: string;
    timestamp: string;
    type: ErrorType;
}

export interface ErrorWithType {
    data: {
        message: string;
        status: string;
        timestamp: string;
        type: ErrorType;
    };
    status: number;
}

export interface TechSinglePageErrorResponse {
    data: {
        message: string;
        status: string;
        timestamp: string;
        type: string;
    };
    status: number;
}
