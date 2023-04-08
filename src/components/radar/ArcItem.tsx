import { FC } from 'react';
import * as d3 from 'd3';
import { Arc, DefaultArcObject } from 'd3';

import { getTextRotationAngle } from './geometryCalc';
import { textOffsetY } from './styleConfig';

type Props = {
    innerRadius: number;
    outerRadius: number;
    startAngle: number;
    endAngle: number;
    color: string;
    ringName: string;
};

const ArcItem: FC<Props> = ({ innerRadius, outerRadius, startAngle, endAngle, color, ringName }) => {
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    const arcGen: Arc<any, DefaultArcObject> = d3.arc();
    /* eslint-enable  @typescript-eslint/no-explicit-any */
    const path: string = arcGen({ innerRadius, outerRadius, startAngle, endAngle }) || '';
    return (
        <>
            <path d={path} fill={color} />
            <text
                text-anchor="middle"
                dominant-baseline="middle"
                x={innerRadius + (outerRadius - innerRadius) / 2}
                y={textOffsetY}
                transform={`rotate(${getTextRotationAngle(startAngle)} 0 0)`}
            >
                {ringName}
            </text>
        </>
    );
};

export default ArcItem;
