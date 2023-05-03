import { FC, useCallback, useMemo } from 'react';
import { createSelector } from '@reduxjs/toolkit';
import * as d3 from 'd3-color';

import {
    clearActiveSector,
    clearHoveredSector,
    setActiveSector,
    setHoveredSector,
    setIsTransforming,
} from '../../store/activeSectorSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { RootState } from '../../store/store';
import RadarSegment from './RadarSegment';
import { sectorNameFontSize, sectorNameTextOffset } from './styleConfig';
import { Blip, RadarComponentVariant, Segment } from './types';
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
    variant: RadarComponentVariant;
};

const defaultTransform = { x: 0, y: 0, scale: 1 };

const makeSelectActiveSector = () =>
    createSelector(
        (state: RootState) => state.activeSector.activeSectorName,
        (_: unknown, variant: RadarComponentVariant) => variant,
        (activeSectorName, variant) => (variant === RadarComponentVariant.Demonstrative ? activeSectorName : null)
    );

const makeHoveredSector = () =>
    createSelector(
        (state: RootState) => state.activeSector.hoveredSectorName,
        (_: unknown, variant: RadarComponentVariant) => variant,
        (hoveredSectorName, variant) => (variant === RadarComponentVariant.Demonstrative ? hoveredSectorName : null)
    );

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
    variant = RadarComponentVariant.Demonstrative,
}) => {
    const endAngle = startAngle + sweepAngle;

    // const hoveredSector = useAppSelector((state) => state.activeSector.hoveredSectorName);
    // const activeSector = useAppSelector((state) => state.activeSector.activeSectorName);

    const selectActiveSector = useMemo(makeSelectActiveSector, []);
    const activeSector = useAppSelector((state) => selectActiveSector(state, variant));

    const selectHoveredSector = useMemo(makeHoveredSector, []);
    const hoveredSector = useAppSelector((state) => selectHoveredSector(state, variant));

    const dispatch = useAppDispatch();

    const transitionEndHandler = useCallback(() => {
        dispatch(setIsTransforming(false));
    }, [dispatch]);

    const transform = useMemo(() => {
        if (variant === RadarComponentVariant.Demonstrative) {
            return activeSector && activeSector === sectorName
                ? getTransform(startAngle, endAngle, radius + gap / 2)
                : defaultTransform;
        }
        return defaultTransform;
    }, [activeSector, sectorName, startAngle, endAngle, radius, gap, variant]);

    const onClickHandler = useCallback(() => {
        if (variant === RadarComponentVariant.Demonstrative) {
            if (activeSector) {
                dispatch(clearActiveSector());
            } else {
                dispatch(setActiveSector(sectorName));
            }
        }
    }, [dispatch, activeSector, sectorName, variant]);

    const onMouseEnterHandler = useCallback(() => {
        if (variant === RadarComponentVariant.Demonstrative) {
            dispatch(setHoveredSector(sectorName));
        }
    }, [dispatch, sectorName, variant]);

    const onMouseLeaveHandler = useCallback(() => {
        if (variant === RadarComponentVariant.Demonstrative) {
            dispatch(clearHoveredSector());
        }
    }, [dispatch, variant]);

    const radiuses = useMemo(() => getRadiusListEqualSquare(ringNames.length, radius), [ringNames, radius]);

    const segments = useMemo(
        () =>
            radiuses.map((ring, i) => {
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
            }),
        [radiuses, blipRadius, ringNames, baseColor, startAngle, endAngle, transform, gap, data, seed, sectorName]
    );

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
