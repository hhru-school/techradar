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
import { Blip, RadarVariant, Ring, Sector, Segment } from './types';
import { getRadiusListEqualSquare, getTransform } from './utils';

import styles from './radar.module.less';

type Props = {
    sector: Sector;
    rings: Ring[];
    blips: Blip[];
    radius: number;
    startAngle: number;
    sweepAngle: number;
    baseColor: string;
    blipRadius: number;
    svgRadius?: number;
    gap?: number;
    seed?: number;
    variant: RadarVariant;
};

const defaultTransform = { x: 0, y: 0, scale: 1 };

const getDisplay = (activeSectorId: number | null, sectorId: number, variant: RadarVariant) => {
    if (variant === RadarVariant.Editable) return 'auto';
    return activeSectorId !== null && activeSectorId !== sectorId ? 'none' : 'auto';
};

const RadarSector: FC<Props> = ({
    sector,
    rings,
    blips,
    radius,
    startAngle,
    sweepAngle,
    baseColor,
    blipRadius,
    seed = 0,
    gap = 0,
    variant = RadarVariant.Demonstrative,
}) => {
    const isDemonsrtative = variant === RadarVariant.Demonstrative;

    const endAngle = startAngle + sweepAngle;

    const activeSectorId = useAppSelector((state) => state.activeSector.activeSectorId);
    const hoveredSectorId = useAppSelector((state) => state.activeSector.hoveredSectorId);

    const dispatch = useAppDispatch();

    const transitionEndHandler = useCallback(() => {
        dispatch(setIsTransforming(false));
    }, [dispatch]);

    const transform = useMemo(() => {
        if (isDemonsrtative) {
            return activeSectorId && activeSectorId === sector.id
                ? getTransform(startAngle, endAngle, radius + gap / 2)
                : defaultTransform;
        }
        return defaultTransform;
    }, [activeSectorId, sector, startAngle, endAngle, radius, gap, isDemonsrtative]);

    const onClickHandler = useCallback(() => {
        if (isDemonsrtative) {
            if (activeSectorId) {
                dispatch(clearActiveSector());
            } else {
                dispatch(setActiveSector(sector.id));
            }
        }
    }, [dispatch, activeSectorId, sector, isDemonsrtative]);

    const onMouseEnterHandler = useCallback(() => {
        if (isDemonsrtative) {
            dispatch(setHoveredSector(sector.id));
        }
    }, [dispatch, sector, isDemonsrtative]);

    const onMouseLeaveHandler = useCallback(() => {
        if (isDemonsrtative) {
            dispatch(clearHoveredSector());
        }
    }, [dispatch, isDemonsrtative]);

    const radiuses = useMemo(() => getRadiusListEqualSquare(rings.length, radius), [rings, radius]);

    const segments = useMemo(
        () =>
            radiuses.map((ring, i) => {
                const segment: Segment = {
                    innerRadius: ring.innerRadius,
                    outerRadius: ring.outerRadius,
                    startAngle,
                    endAngle,
                };
                const id = `${sector.id}-${rings[i].id}`.toLowerCase();
                return (
                    <RadarSegment
                        id={id}
                        key={id}
                        ring={rings[i]}
                        sector={sector}
                        segment={segment}
                        blips={blips.filter((item) => item.ring.id === rings[i].id)}
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
        [radiuses, blipRadius, rings, baseColor, startAngle, endAngle, transform, gap, blips, seed, sector, variant]
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
            opacity={hoveredSectorId && hoveredSectorId !== sector.id ? 0.5 : 1}
            display={getDisplay(activeSectorId, sector.id, variant)}
            onTransitionEnd={transitionEndHandler}
        >
            <RadarSectorLabel
                sector={sector}
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
