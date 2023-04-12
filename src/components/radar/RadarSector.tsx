import { FC } from 'react';
import * as d3 from 'd3-color';

import RadarSegment from './RadarSegment';
import { Blip } from './types';
import { Segment, getRadiusListEqualSquare } from './utils';

type Props = {
    sectorName: string;
    ringNames: string[];
    radius: number;
    startAngle: number;
    endAngle: number;
    baseColor: string;
    data?: Blip[] | null;
};

const RadarSector: FC<Props> = ({ sectorName, ringNames, radius, startAngle, endAngle, baseColor, data = null }) => {
    const radiuses = getRadiusListEqualSquare(ringNames.length, radius);

    const segments = radiuses.map((ring, i) => {
        const segment: Segment = {
            centerX: 0,
            centerY: 0,
            innerRadius: ring.innerRadius,
            outerRadius: ring.outerRadius,
            startAngle,
            endAngle,
        };
        const id = `${sectorName}-${ringNames[i]}`.toLocaleLowerCase();
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
            />
        );
    });

    return (
        <g>
            {segments}
            {/* <g transform={`translate (${radius + offsetXY.x + gap / 2}, ${radius + offsetXY.y + gap / 2})`}>{arcs}</g> */}
        </g>
    );
};

export default RadarSector;
