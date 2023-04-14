import { FC } from 'react';
import * as d3 from 'd3-color';

import RadarSegment from './RadarSegment';
import { Blip } from './types';
import { Segment, radiusListEqualSquare } from './utils';

type Props = {
    sectorName: string;
    ringNames: string[];
    radius: number;
    angle: number;
    rotationAngle: number;
    baseColor: string;
    data?: Blip[] | null;
    seed?: number;
};

const RadarSector: FC<Props> = ({
    sectorName,
    ringNames,
    radius,
    angle,
    rotationAngle,
    baseColor,
    data = null,
    seed = 0,
}) => {
    const radiuses = radiusListEqualSquare(ringNames.length, radius);

    const segments = radiuses.map((ring, i) => {
        const segment: Segment = {
            innerRadius: ring.innerRadius,
            outerRadius: ring.outerRadius,
            startAngle: 0,
            endAngle: angle,
        };
        const id = `${sectorName}-${ringNames[i]}`.toLowerCase();
        return (
            <RadarSegment
                id={id}
                key={id}
                ringName={ringNames[i]}
                segment={segment}
                data={data && data.filter((item) => item.ringName === ringNames[i])}
                color={
                    d3
                        .color(baseColor)
                        ?.brighter(i / 3)
                        .toString() || ''
                }
                rotationAngle={rotationAngle}
                seed={seed}
            />
        );
    });

    return <g>{segments}</g>;
};

export default RadarSector;
