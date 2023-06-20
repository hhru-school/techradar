import { FC, memo, useMemo } from 'react';

import { clearActiveSegment, setActiveSegment } from '../../store/editRadarSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import RadarBlip from './RadarBlip';
import RadarRingLabel from './RadarRingLabel';
import packEntries from './packEngine';
import { Blip, Entry, RadarVariant, Ring, Sector, Segment } from './types';
import { getRandomPoint, translateSegmentToD3 } from './utils';

import styles from './radar.module.less';

type Props = {
    id: string;
    segment: Segment;
    color: string;
    ring: Ring;
    sector: Sector;
    blipRadius: number;
    gap?: number;
    blips: Blip[];
    seed?: number;
    variant?: RadarVariant;
};

const getOpacity = (isEditable: boolean, isDragging: boolean, isActive: boolean) => {
    if (isEditable && isDragging) {
        return isActive ? 1 : 0.3;
    }
    return 1;
};

const RadarSegment: FC<Props> = ({
    id,
    segment,
    color,
    ring,
    blips,
    sector,
    seed = 0,
    gap = 0,
    blipRadius,
    variant = RadarVariant.Demonstrative,
}) => {
    const blipItems = useMemo(() => {
        if (blips.length === 0) return null;
        const entries = new Array<Entry>(blips.length);
        entries.fill({ ...getRandomPoint(seed), r: blipRadius * 1.5 });
        const packed = packEntries(entries, segment);
        return packed.map((entry, i) => {
            return (
                <RadarBlip
                    key={blips[i].id}
                    id={blips[i].id}
                    label={blips[i].label}
                    name={blips[i].name}
                    r={blipRadius}
                    x={entry.x}
                    y={entry.y}
                    variant={variant}
                    drawInfo={blips[i].drawInfo}
                />
            );
        });
    }, [blips, blipRadius, seed, segment, variant]);

    const path: string = translateSegmentToD3(segment);

    const x = segment.innerRadius + (segment.outerRadius - segment.innerRadius) / 2;
    const y = gap / 2;

    const dispatch = useAppDispatch();
    const isActive = useAppSelector(
        (state) =>
            state.editRadar.activeSegment?.ring.id === ring.id && state.editRadar.activeSegment?.sector.id === sector.id
    );
    const isDragging = useAppSelector((state) => state.editRadar.isDragging);

    const isEditable = variant === RadarVariant.Editable;

    const onMouseEnterHandler = () => {
        if (variant === RadarVariant.Editable && isDragging) {
            dispatch(setActiveSegment({ ring, sector }));
        }
    };

    const onMouseLeaveHandler = () => {
        if (isEditable && isDragging) {
            dispatch(clearActiveSegment());
        }
    };

    const opacity = getOpacity(isEditable, isDragging, isActive);

    return (
        <g>
            <path
                id={id}
                d={path}
                fill={color}
                className={styles.segment}
                onMouseEnter={variant === RadarVariant.Editable ? onMouseEnterHandler : undefined}
                onMouseLeave={variant === RadarVariant.Editable ? onMouseLeaveHandler : undefined}
                opacity={opacity}
            />

            {blipItems}

            {gap && <RadarRingLabel x={x} y={y} segment={segment} ring={ring} variant={variant} />}
        </g>
    );
};

export default memo(RadarSegment);
