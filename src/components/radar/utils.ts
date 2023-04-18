import { Arc, DefaultArcObject } from 'd3';
import * as d3 from 'd3';

import { Cartesian, Entry, Polar, Segment } from './types';

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
