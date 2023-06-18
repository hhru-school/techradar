export interface Cartesian {
    x: number;
    y: number;
}

export interface Polar {
    r: number;
    a: number;
}

export interface Entry {
    x: number;
    y: number;
    r: number;
}

export interface Segment {
    innerRadius: number;
    outerRadius: number;
    startAngle: number;
    endAngle: number;
}

export interface Sector {
    id: number;
    name: string;
}

export interface Ring {
    id: number;
    name: string;
}

export type DrawInfo = 'NEW' | 'FIXED' | 'BACKWARD' | 'FORWARD' | 'SEC_MOVE';

export interface Blip {
    id: number;
    label: string | number;
    name: string;
    ring: Ring;
    sector: Sector;
    description: string | null;
    drawInfo?: DrawInfo;
}

export interface RadarInterface {
    id: number;
    name: string;
    sectors: Sector[];
    rings: Ring[];
    companyId: number;
    authorId: number;
    blips: Blip[];
}

export interface Transform {
    x: number;
    y: number;
    scale: number;
}

export enum RadarVariant {
    Demonstrative,
    Editable,
}
