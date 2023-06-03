export interface VersionData {
    id: number;
    name: string;
    release: boolean | string;
    radarId: number;
    blipEventId: number;
    creationTime: string | Date;
    lastChangeTime: string | Date;
}

export type RadarVersionData = Array<VersionData>;

export type GridRadar = Array<RadarVersionData>;

export interface GridRadarObj {
    [index: string]: GridRadar;
}
