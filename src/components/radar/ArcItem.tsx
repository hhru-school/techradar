import { FC } from 'react';
import * as d3 from 'd3';
import { Arc, DefaultArcObject } from 'd3';

import { getBlipPositionSet } from './blipPackingEngine';
import { getTextRotationAngle } from './geometryCalc';
import { textOffsetY } from './styleConfig';
import { Blip } from './types';

import styles from './blip.module.less';

type Props = {
    id: string;
    innerRadius: number;
    outerRadius: number;
    startAngle: number;
    endAngle: number;
    color: string;
    ringName: string;
    data?: Blip[] | null;
};

const ArcItem: FC<Props> = ({ id, innerRadius, outerRadius, startAngle, endAngle, color, ringName, data }) => {
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    const arcGen: Arc<any, DefaultArcObject> = d3.arc();
    /* eslint-enable  @typescript-eslint/no-explicit-any */

    const path: string = arcGen({ innerRadius, outerRadius, startAngle, endAngle }) || '';
    const blipPositionSet =
        data && getBlipPositionSet(innerRadius, outerRadius, startAngle, endAngle, data.length, 4, 5);
    const blips =
        blipPositionSet &&
        blipPositionSet.map((item) => <circle cx={item.x} cy={item.y} r="4" className={styles.blip} />);

    return (
        <g>
            <path id={id} d={path} fill={color} />
            <text
                textAnchor="middle"
                dominantBaseline="middle"
                x={innerRadius + (outerRadius - innerRadius) / 2}
                y={textOffsetY}
                transform={`rotate(${getTextRotationAngle(startAngle)} 0 0)`}
            >
                {ringName}
            </text>
            {blips}
        </g>
    );
};

export default ArcItem;
