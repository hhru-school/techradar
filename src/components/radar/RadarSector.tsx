import { FC } from 'react';
import * as d3 from 'd3-color';

import {
    clearActiveSector,
    clearHoveredSector,
    setActiveSector,
    setHoveredSector,
    setIsTransforming,
} from '../../store/activeSectorSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import RadarSegment from './RadarSegment';
import { sectorNameFontSize, sectorNameTextOffset } from './styleConfig';
import { Blip, Segment } from './types';
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

    const hoveredSector = useAppSelector((state) => state.activeSector.hoveredSectorName);
    const activeSector = useAppSelector((state) => state.activeSector.activeSectorName);

    const dispatch = useAppDispatch();

    const transitionEndHandler = () => {
        dispatch(setIsTransforming(false));
    };

    const transform =
        activeSector && activeSector === sectorName
            ? getTransform(startAngle, endAngle, radius + gap / 2)
            : { x: 0, y: 0, scale: 1 };

    const onClickHandler = () => {
        if (activeSector) {
            dispatch(clearActiveSector());
        } else {
            dispatch(setActiveSector(sectorName));
        }
    };

    const onMouseEnterHandler = () => {
        dispatch(setHoveredSector(sectorName));
    };

    const onMouseLeaveHandler = () => {
        dispatch(clearHoveredSector());
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
                blipRadius={blipRadius / transform.scale}
            />
        );
    });

    return (
        <g
            onClick={onClickHandler}
            onMouseEnter={onMouseEnterHandler}
            onMouseLeave={onMouseLeaveHandler}
            className={styles.animated}
            transform={`translate(${transform.x} ${transform.y}) scale(${transform.scale})`}
            opacity={hoveredSector && hoveredSector !== sectorName ? 0.5 : 1}
            display={activeSector && activeSector !== sectorName ? 'none' : 'auto'}
            cursor="pointer"
            onTransitionEnd={transitionEndHandler}
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
