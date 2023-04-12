import { Arc, DefaultArcObject } from 'd3';
import * as d3 from 'd3';

function getRingSquare(innerRadius = 0, outerRadius: number): number {
    return Math.PI * (Math.pow(outerRadius, 2) - Math.pow(innerRadius, 2));
}

function getOuterRingRadius(innerRadius: number, square: number): number {
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
        currentOuterRadius = getOuterRingRadius(currentInnerRadius, itemSquare);
        radiusParamList.push({
            innerRadius: currentInnerRadius,
            outerRadius: currentOuterRadius,
        });
        currentInnerRadius = currentOuterRadius;
    }
    return radiusParamList;
};

// ///////////////////////////////////
export interface Offset {
    x: number;
    y: number;
}

export function getCorrection(startAngle: number, sweepAngle: number, gap: number): Offset {
    const angle = startAngle + sweepAngle / 2;

    return {
        x: (gap / 2) * Math.sin(angle),
        y: (-gap / 2) * Math.cos(angle),
    };
}

export function getTextRotationAngle(rad: number): number {
    return (rad * 180) / Math.PI - 90;
}

export function getDisIsolineBlips(angle: number, radius: number): number {
    return Math.sin(angle / 2) * radius;
}

export function getMinAngle(itemRadius: number, radius: number): number {
    return Math.asin(itemRadius / radius) * 2;
}

export interface Cartesian {
    x: number;
    y: number;
}

export interface Polar {
    radius: number;
    angle: number;
}

export interface Entry {
    x: number;
    y: number;
    radius: number;
}

export interface Segment {
    centerX: number;
    centerY: number;
    innerRadius: number;
    outerRadius: number;
    startAngle: number;
    endAngle: number;
}

function relToAbs(x: number, y: number, centerX = 0, centerY = 0): Cartesian {
    return {
        x: centerX + x,
        y: centerY - y,
    };
}

function absToRel(x: number, y: number, centerX = 0, centerY = 0): Cartesian {
    return {
        x: x - centerX,
        y: centerY - y,
    };
}

export function polarToCartesian(radius: number, angle: number): Cartesian {
    return {
        x: radius * Math.cos(angle),
        y: radius * Math.sin(angle),
    };
}

export function cartesianToPolar(x: number, y: number, centerX = 0, centerY = 0): Polar {
    const cart = absToRel(x, y, centerX, centerY);
    return {
        radius: Math.sqrt(cart.x * cart.x + cart.y * cart.y),
        // проверить!
        angle: Math.atan2(cart.y, cart.x),
    };
}

export function getSegmentCenteroid(segment: Segment): Cartesian {
    const pol: Polar = {
        radius: segment.innerRadius + (segment.outerRadius - segment.innerRadius) / 2,
        angle: segment.startAngle + (segment.endAngle - segment.startAngle) / 2,
    };

    const carRel = polarToCartesian(pol.radius, pol.angle);

    return relToAbs(carRel.x, carRel.y, segment.centerX, segment.centerY);
}

export function isClipped(entry: Entry, segment: Segment): boolean {
    const pol = cartesianToPolar(entry.x, entry.y, segment.centerX, segment.centerY);

    if (pol.radius < segment.innerRadius + entry.radius || pol.radius > segment.outerRadius - entry.radius)
        return false;

    if (
        pol.angle < segment.startAngle + Math.asin(entry.radius / pol.radius) ||
        pol.angle > segment.endAngle - Math.asin(entry.radius / pol.radius)
    )
        return false;

    return true;
}

export function clip(entry: Entry, segment: Segment, borderOffset = 0): Entry {
    const pol = cartesianToPolar(entry.x, entry.y, segment.centerX, segment.centerY);

    const r = Math.max(
        segment.innerRadius + entry.radius + borderOffset,
        Math.min(segment.outerRadius - entry.radius - borderOffset, pol.radius)
    );
    const a = Math.max(
        segment.startAngle + Math.asin((entry.radius + borderOffset) / pol.radius),
        Math.min(segment.endAngle - Math.asin((entry.radius + borderOffset) / pol.radius), pol.angle)
    );

    const cartRel = polarToCartesian(r, a);
    const cartAbs = relToAbs(cartRel.x, cartRel.y, segment.centerX, segment.centerY);

    // if (isNaN(cartAbs.x) || isNaN(cartAbs.y)) {
    //     console.log('entry', entry);
    // }

    return { x: cartAbs.x, y: cartAbs.y, radius: entry.radius };
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
