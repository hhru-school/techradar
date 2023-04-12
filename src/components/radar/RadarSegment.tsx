import { FC } from 'react';

import packEntries from './packEngine';
import { Blip } from './types';
import { Entry, Segment, segmentToD3 } from './utils';

type Props = {
    id: string;
    segment: Segment;
    color: string;
    ringName: string;
    data?: Blip[] | null;
};

const RadarSegment: FC<Props> = ({ id, segment, color }) => {
    const testData = new Array<Entry>();

    for (let i = 0; i < 5; i++) {
        testData.push({ x: 10 * i, y: 20 * i, radius: 5 });
    }

    const dots = packEntries(testData, segment, 2, 11).map((dot) => {
        return <circle cx={dot.x} cy={dot.y} r="5" fill="yellow" />;
    });
    const path: string = segmentToD3(segment);

    return (
        <>
            <g>
                <path id={id} d={path} fill={color} />
                {dots}

                {/* <text
                    textAnchor="middle"
                    dominantBaseline="middle"
                    x={innerRadius + (outerRadius - innerRadius) / 2}
                    y={textOffsetY}
                    transform={`rotate(${getTextRotationAngle(startAngle)} 0 0)`}
                >
                    {ringName}
                </text> */}
            </g>
        </>
    );
};

export default RadarSegment;
