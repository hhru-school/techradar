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

export function polarToCartesian(radius: number, angle: number): Cartesian {
    return {
        x: radius * Math.sin(angle),
        y: -radius * Math.cos(angle),
    };
}
