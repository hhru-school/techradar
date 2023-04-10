import { Cartesian, getMinAngle, radialToCartesian } from './geometryCalc';

export interface BlipPositionSet {
    x: number;
    y: number;
}

export function getBlipPositionSet(
    innerRadius: number,
    outerRadius: number,
    startAngle: number,
    endAngle: number,
    numberOfBlips: number,
    blipRadius: number,
    padding = 0
): Array<BlipPositionSet> {
    const sweepAngle = endAngle - startAngle;

    const arcWidth = outerRadius - innerRadius;

    const calcBlipRadius = blipRadius + padding;

    const rowDistance = 2 * calcBlipRadius * Math.sin(Math.PI / 3);

    const numRows = Math.floor((arcWidth - 2 * calcBlipRadius) / rowDistance);

    let currentPointNum = Math.floor(numberOfBlips / numRows);
    let currentRadius = innerRadius + calcBlipRadius;
    let currentAngleDist = sweepAngle / (currentPointNum + 1);
    let borderAngle = (sweepAngle - currentAngleDist * (currentPointNum - 1)) / 2;

    const res = new Array<BlipPositionSet>();

    const minAngle = getMinAngle(calcBlipRadius, currentRadius);

    while (currentAngleDist < minAngle && borderAngle < minAngle / 2) {
        currentPointNum -= 1;
        currentAngleDist = sweepAngle / (currentPointNum + 1);
        borderAngle = (sweepAngle - currentAngleDist * currentPointNum) / 2;
    }

    const arcSpace = currentAngleDist * currentRadius;
    let currentStartAngle = borderAngle;
    let currentAngle = currentStartAngle;

    for (let i = 0; i < numberOfBlips; i++) {
        const coords: Cartesian = radialToCartesian(currentRadius, borderAngle + currentAngleDist * i);
        res.push({ x: coords.x, y: coords.y });
        currentAngle += arcSpace / currentRadius;
        if (endAngle - currentAngle < minAngle / 2) {
            currentRadius += rowDistance;
            currentStartAngle -= arcSpace / currentRadius / numRows;
            if (currentAngle - currentAngle < minAngle / 2) {
                currentAngle += arcSpace / currentRadius;
            }
            currentAngle = currentStartAngle;
        }
    }

    return res;
}
