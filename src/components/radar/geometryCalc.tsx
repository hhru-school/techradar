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

// //////////////////////////////////
export function getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

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
