import { FC } from 'react';
import * as d3 from 'd3-color';

import ArcItem from './ArcItem';
import { Offset, RadiusData, getCorrection, getRadiusListEqualSquare } from './geometryCalc';
import { Blip } from './types';

type Props = {
    sectorName: string;
    ringNames: string[];
    radius: number;
    startAngle: number;
    sweepAngle: number;
    gap: number;
    baseColor: string;
    data?: Blip[] | null;
};

const Sector: FC<Props> = ({ sectorName, ringNames, radius, startAngle, sweepAngle, gap, baseColor, data = null }) => {
    const offsetXY: Offset = getCorrection(startAngle, sweepAngle, gap);
    const radiusData: RadiusData[] = getRadiusListEqualSquare(ringNames.length, radius);

    const arcs = radiusData.map((ring, i) => {
        const id = `${sectorName}-${ringNames[i]}`.toLocaleLowerCase();
        return (
            <ArcItem
                id={id}
                key={id}
                innerRadius={ring.innerRadius}
                outerRadius={ring.outerRadius}
                startAngle={startAngle}
                endAngle={startAngle + sweepAngle}
                color={
                    d3
                        .color(baseColor)
                        ?.brighter(i / 3)
                        .toString() || ''
                }
                ringName={ringNames[i]}
                data={data && data.filter((item) => item.ringName === ringNames[i])}
            />
        );
    });
    return (
        <svg>
            <g transform={`translate (${radius + offsetXY.x + gap / 2}, ${radius + offsetXY.y + gap / 2})`}>{arcs}</g>
        </svg>
    );
};

export default Sector;
