import { Arc, DefaultArcObject } from 'd3';
import * as d3 from 'd3';

import { Cartesian, Entry, Polar, RadarInterface, Ring, Sector, Segment, Transform } from './types';

function getRingSquare(innerRadius = 0, outerRadius: number): number {
    return Math.PI * (Math.pow(outerRadius, 2) - Math.pow(innerRadius, 2));
}

function getOuterRadius(innerRadius: number, square: number): number {
    return Math.sqrt((square + Math.PI * Math.pow(innerRadius, 2)) / Math.PI);
}

export interface RadiusData {
    innerRadius: number;
    outerRadius: number;
}

export interface RadiusListCallback {
    (numOfRings: number, radius: number): RadiusData[];
}

export const getRadiusListEqualSquare: RadiusListCallback = (numOfRings: number, radius: number) => {
    const itemSquare = getRingSquare(0, radius) / numOfRings;
    const radiusParamList: RadiusData[] = [];
    let currentInnerRadius = 0;
    let currentOuterRadius;
    for (let i = 0; i < numOfRings; i++) {
        currentOuterRadius = getOuterRadius(currentInnerRadius, itemSquare);
        radiusParamList.push({
            innerRadius: currentInnerRadius,
            outerRadius: currentOuterRadius,
        });
        currentInnerRadius = currentOuterRadius;
    }
    return radiusParamList;
};

export function getOffset(gap: number, sweepAngle: number): number {
    if (sweepAngle > Math.PI) return 0;
    return gap / 2 / Math.sin(sweepAngle / 2);
}

export function getOffsetXY(gap: number, startAngle: number, sweepAngle: number): Cartesian {
    const ofst = getOffset(gap, sweepAngle);
    const a = startAngle + sweepAngle / 2;
    if (Math.sin(a) === 0) return { x: -getOffset, y: 0 };
    return {
        x: ofst * Math.cos(a),
        y: -ofst * Math.sin(a),
    };
}

export function getCartesian(radius: number, angle: number): Cartesian {
    return {
        x: radius * Math.cos(angle),
        y: radius * Math.sin(angle),
    };
}

export function getPolar(x: number, y: number): Polar {
    const a = Math.atan2(y, x);
    return {
        r: Math.sqrt(x * x + y * y),
        a: a < 0 ? a + 2 * Math.PI : a,
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

    return getCartesian(r, a);
}

export function clip(entry: Entry, segment: Segment): Cartesian {
    const cart = entry;
    const pol = getPolar(cart.x, cart.y);

    if (segment.endAngle - segment.startAngle === 2 * Math.PI) {
        const r = boundInterval(segment.innerRadius + entry.r, segment.outerRadius - entry.r, pol.r);
        return getCartesian(r, pol.a);
    }

    const bisector = (segment.endAngle - segment.startAngle) / 2;

    const offset = pol.r > entry.r ? Math.asin(entry.r / pol.r) : bisector;

    const crop: Segment = {
        innerRadius: Math.max(entry.r / Math.sin(bisector), segment.innerRadius + entry.r),
        outerRadius: segment.outerRadius - entry.r,
        startAngle: segment.startAngle + offset,
        endAngle: segment.endAngle - offset,
    };

    return boundSegment(crop, pol);
}

export function translateSegmentToD3(segment: Segment): string {
    const arcGen: Arc<unknown, DefaultArcObject> = d3.arc();

    return (
        arcGen({
            innerRadius: segment.innerRadius,
            outerRadius: segment.outerRadius,
            startAngle: Math.PI / 2 - segment.endAngle,
            endAngle: Math.PI / 2 - segment.startAngle,
        }) || ''
    );
}

function getPseudoRandom(seed: number): number {
    return Math.abs(Math.sin(seed));
}

export function getRandomPoint(seed: number): Cartesian {
    return {
        x: getPseudoRandom(seed),
        y: getPseudoRandom(seed),
    };
}

export function buildArc(startAngle: number, endAngle: number, r: number): string {
    const startX = r * Math.cos(endAngle);
    const startY = -r * Math.sin(endAngle);
    const endX = r * Math.cos(startAngle);
    const endY = -r * Math.sin(startAngle);
    return `M ${startX} ${startY} A ${r} ${r} 0 0 1 ${endX},${endY} `;
}

export function convertRadToDeg(rad: number): number {
    return (rad * 180) / Math.PI;
}

export function getSectorCentroid(startAngle: number, sweepAngle: number, r: number): Cartesian {
    return getCartesian(r / 2, startAngle + sweepAngle / 2);
}

export function getTransform(startAngle: number, endAngle: number, r: number): Transform {
    const bisector = startAngle + (endAngle - startAngle) / 2;

    if (endAngle - startAngle === Math.PI / 2) {
        return {
            x: -r * Math.sign(Math.cos(bisector)),
            y: r * Math.sign(Math.sin(bisector)),
            scale: 2,
        };
    }

    const circumRad = r / 2 / Math.cos((endAngle - startAngle) / 2);
    const polCircumCenter = { r: circumRad, a: bisector };
    const cartCircumCenter = getCartesian(polCircumCenter.r, polCircumCenter.a);
    const scale = r / circumRad;

    return {
        x: -cartCircumCenter.x * scale,
        y: cartCircumCenter.y * scale,
        scale,
    };
}

export const getSectorNames = (radar: RadarInterface): string[] => radar.sectors.map((sector) => sector.name);
export const getRingNames = (radar: RadarInterface): string[] => radar.rings.map((ring) => ring.name);

export const getSectorById = (radar: RadarInterface, id: number): Sector =>
    radar.sectors.find((sector) => sector.id === id) as Sector;
export const getRingById = (radar: RadarInterface, id: number): Ring =>
    radar.rings.find((ring) => ring.id === id) as Ring;

export const getSectorByName = (radar: RadarInterface, name: string): Sector => {
    const sector = radar.sectors.find((sector) => sector.name.toLowerCase() === name.toLowerCase());
    if (!sector) throw new Error('SectorName not exist on radar');
    return sector;
};

export const getRingByName = (radar: RadarInterface, name: string): Ring => {
    const ring = radar.rings.find((ring) => ring.name.toLowerCase() === name.toLowerCase());
    if (!ring) throw new Error('RingName not exist on radar');
    return ring;
};

const getTriangleDimensions = (r: number): { size: number; height: number } => {
    const size = ((2 * r) / Math.tan(Math.PI / 6)) * 0.95;
    const height = size * Math.sin(Math.PI / 3);
    return { size, height };
};

export const buildTriangleUp = (x: number, y: number, r: number): string => {
    const { size, height } = getTriangleDimensions(r);
    return `M ${x},${r - height + y} ${size / 2 + x},${r + y} ${-size / 2 + x},${r + y} Z`;
};

export const buildTriangleDown = (x: number, y: number, r: number): string => {
    const { size, height } = getTriangleDimensions(r);
    return `M ${-size / 2 + x},${y - r} ${size / 2 + x},${y - r} ${x},${height - r + y} Z`;
};

const getArrowDimensions = (r: number): { size: number; height: number; offset: number } => {
    const size = r * 1.5;
    const height = size * Math.sin(Math.PI / 3);
    return {
        size,
        height,
        offset: 0,
    };
};

export const buildArrowUp = (x: number, y: number, r: number): string => {
    const { size, height, offset } = getArrowDimensions(r);
    return `M ${x - size / 2},${y - offset} l${size},${0} l${-size / 2},${-height} Z`;
};

export const buildArrowDown = (x: number, y: number, r: number): string => {
    const { size, height, offset } = getArrowDimensions(r);
    return `M ${x - size / 2},${y + offset} l${size},${0} l${-size / 2},${height} Z`;
};
