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

export interface Blip {
    id: number;
    name: string;
    ringName: string;
    sectorName: string;
    description: string;
}

export interface Transform {
    x: number;
    y: number;
    scale: number;
}
