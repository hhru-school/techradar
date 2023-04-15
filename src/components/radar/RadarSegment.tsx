import { FC, useMemo } from 'react';

import RadarBlip from './RadarBlip';
import packEntries from './packEngine';
import { Blip, Entry, Segment } from './types';
import { deg, randomPoint, segmentToD3 } from './utils';

import styles from './radar.module.less';

type Props = {
    id: string;
    segment: Segment;
    color: string;
    ringName: string;
    blipRadius: number;
    gap?: number;
    data?: Blip[] | null;
    seed?: number;
};

const textRotation = (rotationAngle: number): number => {
    const d = deg(rotationAngle);
    return d > 90 && d <= 270 ? 180 : 0;
};

const RadarSegment: FC<Props> = ({ id, segment, color, ringName, seed = 0, gap = 0, data = null, blipRadius }) => {
    const blips = useMemo(() => {
        if (!data) return null;
        const entries = new Array<Entry>(data.length);
        entries.fill({ ...randomPoint(seed), r: blipRadius * 2 });
        const packed = packEntries(entries, segment);
        return packed.map((entry, i) => {
            return (
                <RadarBlip
                    key={data[i].id}
                    id={data[i].id}
                    description={data[i].description}
                    r={blipRadius}
                    x={entry.x}
                    y={entry.y}
                />
            );
        });
    }, [data, blipRadius, seed, segment]);

    const path: string = segmentToD3(segment);

    const x = segment.innerRadius + (segment.outerRadius - segment.innerRadius) / 2;
    const y = gap / 2;

    return (
        <g>
            <path id={id} d={path} fill={color} className={styles.segment} />
            {/* {dots} */}
            {blips}

            {gap && (
                <text
                    className={styles.ringName}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    x={x}
                    y={y}
                    transform={`rotate(${-deg(segment.startAngle)}  0 0) rotate(${textRotation(
                        segment.startAngle
                    )} ${x} ${y})`}
                >
                    {ringName}
                </text>
            )}
        </g>
    );
};

export default RadarSegment;
