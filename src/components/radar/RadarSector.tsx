import { FC, useState } from 'react';
import * as d3 from 'd3-color';

import RadarSegment from './RadarSegment';
import { sectorNameFontSize, sectorNameTextOffset } from './styleConfig';
import { Blip, Segment, Transform } from './types';
import { buildArc, getRadiusListEqualSquare, getTransform } from './utils';

import styles from './radar.module.less';

type Props = {
    sectorName: string;
    ringNames: string[];
    radius: number;
    startAngle: number;
    sweepAngle: number;
    baseColor: string;
    blipRadius: number;

    svgRadius?: number;
    gap?: number;
    data?: Blip[] | null;
    seed?: number;
};

const RadarSector: FC<Props> = ({
    sectorName,
    ringNames,
    radius,
    startAngle,
    sweepAngle,
    baseColor,
    blipRadius,

    data = null,
    seed = 0,
    gap = 0,
}) => {
    const endAngle = startAngle + sweepAngle;

    const [transform, setTransform] = useState<Transform>({ x: 0, y: 0, scale: 1 });

    const [zoom, setZoom] = useState(false);

    const onClickHandler = () => {
        const transform = zoom ? { x: 0, y: 0, scale: 1 } : getTransform(startAngle, endAngle, radius + gap / 2);
        setTransform(transform);
        setZoom((prev) => !prev);
    };

    const radiuses = getRadiusListEqualSquare(ringNames.length, radius);

    const segments = radiuses.map((ring, i) => {
        const segment: Segment = {
            innerRadius: ring.innerRadius,
            outerRadius: ring.outerRadius,
            startAngle,
            endAngle,
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
                seed={seed}
                gap={gap}
                blipRadius={blipRadius}
            />
        );
    });

    return (
        <g
            onClick={onClickHandler}
            className={styles.animated}
            transform={`translate(${transform.x} ${transform.y}) scale(${transform.scale})  `}
        >
            <path
                id={`curve-${sectorName}`}
                fill="transparent"
                d={buildArc(startAngle, startAngle + sweepAngle, radius)}
            />
            <text fontSize={sectorNameFontSize}>
                <textPath
                    xlinkHref={`#curve-${sectorName}`}
                    dominantBaseline="middle"
                    className={styles.sectorName}
                    startOffset="50%"
                >
                    <tspan dy={-sectorNameTextOffset}>{sectorName}</tspan>
                </textPath>
            </text>
            {segments}
        </g>
    );
};

export default RadarSector;
