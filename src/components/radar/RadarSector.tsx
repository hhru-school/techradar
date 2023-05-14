import { FC, useCallback, useMemo } from 'react';
import classNames from 'classnames';
import * as d3 from 'd3-color';

import {
    clearActiveSector,
    clearHoveredSector,
    setActiveSector,
    setHoveredSector,
    setIsTransforming,
} from '../../store/activeSectorSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import RadarSectorLabel from './RadarSectorLabel';
import RadarSegment from './RadarSegment';
import { Blip, RadarComponentVariant, Segment } from './types';
import { getRadiusListEqualSquare, getTransform } from './utils';

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

const getDisplay = (activeSector: string | null, sectorName: string, variant: RadarComponentVariant) => {
    if (variant === RadarComponentVariant.Editable) return 'auto';
    return activeSector && activeSector !== sectorName ? 'none' : 'auto';
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
    variant = RadarComponentVariant.Demonstrative,
}) => {
    const isDemonsrtative = variant === RadarComponentVariant.Demonstrative;

    const endAngle = startAngle + sweepAngle;

    const activeSector = useAppSelector((state) => state.activeSector.activeSectorName);
    const hoveredSector = useAppSelector((state) => state.activeSector.hoveredSectorName);

    const dispatch = useAppDispatch();

    const transitionEndHandler = useCallback(() => {
        dispatch(setIsTransforming(false));
    }, [dispatch]);

    const transform = useMemo(() => {
        if (isDemonsrtative) {
            return activeSector && activeSector === sectorName
                ? getTransform(startAngle, endAngle, radius + gap / 2)
                : defaultTransform;
        }
        return defaultTransform;
    }, [activeSector, sectorName, startAngle, endAngle, radius, gap, isDemonsrtative]);

    const onClickHandler = useCallback(() => {
        if (isDemonsrtative) {
            if (activeSector) {
                dispatch(clearActiveSector());
            } else {
                dispatch(setActiveSector(sectorName));
            }
        }
    }, [dispatch, activeSector, sectorName, isDemonsrtative]);

    const onMouseEnterHandler = useCallback(() => {
        if (isDemonsrtative) {
            dispatch(setHoveredSector(sectorName));
        }
    }, [dispatch, sectorName, isDemonsrtative]);

    const onMouseLeaveHandler = useCallback(() => {
        if (isDemonsrtative) {
            dispatch(clearHoveredSector());
        }
    }, [dispatch, isDemonsrtative]);

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
                        sectorName={sectorName}
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
                        variant={variant}
                    />
                );
            }),
        [
            radiuses,
            blipRadius,
            ringNames,
            baseColor,
            startAngle,
            endAngle,
            transform,
            gap,
            data,
            seed,
            sectorName,
            variant,
        ]
    );

    const classes = classNames({
        [styles.sectorDemonstrative]: isDemonsrtative,
        [styles.sectorDefault]: !isDemonsrtative,
    });

    return (
        <g
            onClick={onClickHandler}
            onMouseEnter={onMouseEnterHandler}
            onMouseLeave={onMouseLeaveHandler}
            className={classes}
            transform={`translate(${transform.x} ${transform.y}) scale(${transform.scale})`}
            opacity={hoveredSector && hoveredSector !== sectorName ? 0.5 : 1}
            display={getDisplay(activeSector, sectorName, variant)}
            onTransitionEnd={transitionEndHandler}
        >
            <RadarSectorLabel
                sectorName={sectorName}
                startAngle={startAngle}
                sweepAngle={sweepAngle}
                radius={radius}
                variant={variant}
            />
            {segments}
        </g>
    );
};

export default RadarSector;
