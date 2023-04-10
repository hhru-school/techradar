import { Cartesian, getMinAngle, polarToCartesian } from './geometryCalc';

export interface BlipPositionSet {
    x: number;
    y: number;
}

export function getBlipPositionSet(
    innerRadius: number,
    outerRadius: number,
    startAngle: number,
    endAngle: number,
    blipNum: number,
    blipRadius: number,
    padding = 0
): Array<BlipPositionSet> {
    const sweepAngle = endAngle - startAngle;

    const ringWidth = outerRadius - innerRadius;

    const calcBlipRadius = blipRadius + padding;

    const radialInterval = 2 * calcBlipRadius * Math.sin(Math.PI / 3);

    let rowNum = Math.floor((ringWidth - 2 * calcBlipRadius) / radialInterval);

    let blipPerRow = Math.floor(blipNum / rowNum);

    blipPerRow = blipPerRow > 0 ? blipPerRow : 1;

    let curRadius = innerRadius + calcBlipRadius;

    let angleInterval = sweepAngle / (blipPerRow + 1);

    let curStartAngle = startAngle + angleInterval;
    let curAngle = curStartAngle;

    let curMinAngle = getMinAngle(calcBlipRadius, curRadius);

    angleInterval = angleInterval > curMinAngle ? angleInterval : curMinAngle;

    const arcInterval = angleInterval * curRadius;

    while (angleInterval < curMinAngle) {
        blipPerRow -= 1;
        if (blipPerRow === 0) {
            blipPerRow += 1;
            curRadius += radialInterval;
            curMinAngle = getMinAngle(calcBlipRadius, curRadius);
            rowNum -= 1;
        }
    }

    const res = new Array<BlipPositionSet>();

    for (let i = 0; i < blipNum; i++) {
        const coord: Cartesian = polarToCartesian(curRadius, curAngle);
        res.push({ x: coord.x, y: coord.y });
        curAngle += angleInterval;

        if (endAngle - curAngle < curMinAngle / 2) {
            curRadius += radialInterval;
            angleInterval = arcInterval / curRadius;

            curStartAngle -= angleInterval / 2;
            if (curStartAngle - startAngle < curMinAngle / 2) {
                curStartAngle = startAngle + angleInterval;
            }
            curAngle = curStartAngle;
            curMinAngle = getMinAngle(calcBlipRadius, curRadius);
        }
    }

    return res;
}
