import { FC } from 'react';

import packEntries from './packEngine';
import { Cartesian, Entry, Segment, getSegmentCenteroid, segmentToD3 } from './utils';

type Props = {
    segment: Segment;
};

const TestArc: FC<Props> = ({ segment }) => {
    const path: string = segmentToD3(segment);

    const centroid: Cartesian = getSegmentCenteroid(segment);

    const testData = new Array<Entry>();
    for (let i = 0; i < 10; i++) {
        testData.push({ x: centroid.x, y: centroid.y, radius: 5 });
    }

    const packedData = packEntries(testData, segment, 3, 10);

    const dots = packedData.map((dot) => {
        return <circle cx={dot.x} cy={dot.y} r="5" fill="yellow" />;
    });

    return (
        <svg width={500} height={500}>
            <g transform={`translate (${segment.centerX},${segment.centerY} )`}>
                <path d={path} fill="grey" />
            </g>
            <g> {dots}</g>
        </svg>
    );
};

export default TestArc;
