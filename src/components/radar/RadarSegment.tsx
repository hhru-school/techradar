import { FC } from 'react';

import packEntries from './packEngine';
import { textOffsetY } from './styleConfig';
import { Blip } from './types';
import { Entry, Segment, randomPoint, segmentToD3 } from './utils';

type Props = {
    id: string;
    segment: Segment;
    color: string;
    ringName: string;
    rotationAngle: number;
    data?: Blip[] | null;
    seed?: number;
};

const RadarSegment: FC<Props> = ({ id, segment, color, ringName, seed = 0 }) => {
    const testData = new Array<Entry>();
    const p = randomPoint(seed);
    for (let i = 0; i < 10; i++) {
        testData.push({ x: p.x, y: p.y, r: 10 });
    }
    const packed = packEntries(testData, segment);
    const dots = packed.map((dot) => {
        return <circle cx={dot.x} cy={dot.y} r="5" fill="white" stroke="black" />;
    });

    const path: string = segmentToD3(segment);

    return (
        <>
            <g>
                <path id={id} d={path} fill={color} />
                {dots}
                <div>df</div>

                <text
                    textAnchor="middle"
                    x={segment.innerRadius + (segment.outerRadius - segment.innerRadius) / 2}
                    y={textOffsetY}
                >
                    {ringName}
                </text>
            </g>
        </>
    );
};

export default RadarSegment;
