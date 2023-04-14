import { Arc, DefaultArcObject } from 'd3';
import * as d3 from 'd3';

function ringSquare(innerRadius = 0, outerRadius: number): number {
    return Math.PI * (Math.pow(outerRadius, 2) - Math.pow(innerRadius, 2));
}

function outerRadius(innerRadius: number, square: number): number {
    return Math.sqrt((square + Math.PI * Math.pow(innerRadius, 2)) / Math.PI);
}

export interface RadiusData {
    innerRadius: number;
    outerRadius: number;
}

export interface RadiusListCallback {
    (numOfRings: number, radius: number): RadiusData[];
}

export const radiusListEqualSquare: RadiusListCallback = (numOfRings: number, radius: number) => {
    const itemSquare = ringSquare(0, radius) / numOfRings;
    const radiusParamList: RadiusData[] = [];
    let currentInnerRadius = 0;
    let currentOuterRadius;
    for (let i = 0; i < numOfRings; i++) {
        currentOuterRadius = outerRadius(currentInnerRadius, itemSquare);
        radiusParamList.push({
            innerRadius: currentInnerRadius,
            outerRadius: currentOuterRadius,
        });
        currentInnerRadius = currentOuterRadius;
    }
    return radiusParamList;
};

export interface Offset {
    x: number;
    y: number;
}

export function offset(gap: number, angle: number): Offset {
    return {
        x: (gap / 2) * Math.cos(angle),
        y: -(gap / 2) * Math.sin(angle),
    };
}

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

export function cartesian(radius: number, angle: number): Cartesian {
    return {
        x: radius * Math.cos(angle),
        y: radius * Math.sin(angle),
    };
}

export function polar(x: number, y: number): Polar {
    return {
        r: Math.sqrt(x * x + y * y),
        a: Math.atan2(y, x),
    };
}

function boundInterval(lim1: number, lim2: number, value: number): number {
    const min = Math.min(lim1, lim2);
    const max = Math.max(lim1, lim2);

    return Math.max(Math.min(value, max), min);
}

function boundSegment(segment: Segment, pol: Polar): Cartesian {
    const r = boundInterval(segment.innerRadius, segment.outerRadius, pol.r);

    const a = boundInterval(segment.startAngle, segment.endAngle, pol.a);
    // const a = pol.a;

    return cartesian(r, a);
}

export function clip(entry: Entry, segment: Segment): Cartesian {
    const cart = entry;
    const pol = polar(cart.x, cart.y);

    const offset = pol.r > entry.r ? Math.asin(entry.r / pol.r) : (segment.endAngle - segment.startAngle) / 2;

    const crop: Segment = {
        innerRadius: segment.innerRadius + entry.r,
        outerRadius: segment.outerRadius - entry.r,
        startAngle: segment.startAngle + offset,
        endAngle: segment.endAngle - offset,
    };

    return boundSegment(crop, pol);
}

export function segmentToD3(segment: Segment): string {
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    const arcGen: Arc<any, DefaultArcObject> = d3.arc();
    /* eslint-enable  @typescript-eslint/no-explicit-any */
    return (
        arcGen({
            innerRadius: segment.innerRadius,
            outerRadius: segment.outerRadius,
            startAngle: Math.PI / 2 - segment.endAngle,
            endAngle: Math.PI / 2 - segment.startAngle,
        }) || ''
    );
}

function pseudoRandom(seed: number): number {
    return Math.abs(Math.sin(seed));
}

export function randomPoint(seed: number): Cartesian {
    return {
        x: pseudoRandom(seed) * 100,
        y: pseudoRandom(seed) * 100,
    };
}

export function deg(rad: number): number {
    return (rad * 180) / Math.PI;
}
