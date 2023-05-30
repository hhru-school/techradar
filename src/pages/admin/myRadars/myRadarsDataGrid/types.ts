export interface VersionData {
    id: number;
    name: string;
    release: boolean;
    radarId: number;
    blipEventId: number;
    creationTime: string | Date;
    lastChangeTime: string | Date;
}

export type RadarsVersionData = Array<VersionData>;

export type GridRadar = Array<RadarsVersionData>;

export interface GridRadarObj {
    [index: string]: GridRadar;
}
