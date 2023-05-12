import { FC, memo, useMemo } from 'react';

import { clearActiveSegment, setActiveSegment } from '../../store/editRadarSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import RadarBlip from './RadarBlip';
import RadarRingLabel from './RadarRingLabel';
import packEntries from './packEngine';
import { Blip, Entry, RadarComponentVariant, Segment } from './types';
import { getRandomPoint, translateSegmentToD3 } from './utils';

import styles from './radar.module.less';

type Props = {
    id: string;
    segment: Segment;
    color: string;
    ringName: string;
    sectorName: string;
    blipRadius: number;
    gap?: number;
    data?: Blip[] | null;
    seed?: number;
    variant?: RadarComponentVariant;
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
    ringName,
    sectorName,
    seed = 0,
    gap = 0,
    data = null,
    blipRadius,
    variant = RadarComponentVariant.Demonstrative,
}) => {
    const blips = useMemo(() => {
        if (!data) return null;
        const entries = new Array<Entry>(data.length);
        entries.fill({ ...getRandomPoint(seed), r: blipRadius * 2 });
        const packed = packEntries(entries, segment);
        return packed.map((entry, i) => {
            return (
                <RadarBlip
                    key={data[i].id}
                    id={data[i].id}
                    name={data[i].name}
                    r={blipRadius}
                    x={entry.x}
                    y={entry.y}
                    variant={variant}
                />
            );
        });
    }, [data, blipRadius, seed, segment, variant]);

    const path: string = translateSegmentToD3(segment);

    const x = segment.innerRadius + (segment.outerRadius - segment.innerRadius) / 2;
    const y = gap / 2;

    const dispatch = useAppDispatch();
    const isActive = useAppSelector(
        (state) =>
            state.editRadar.activeSegment?.ringName === ringName &&
            state.editRadar.activeSegment?.sectorName === sectorName
    );
    const isDragging = useAppSelector((state) => state.editRadar.isDragging);

    const isEditable = variant === RadarComponentVariant.Editable;

    const onMouseEnterHandler = () => {
        if (variant === RadarComponentVariant.Editable && isDragging) {
            dispatch(setActiveSegment({ ringName, sectorName }));
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
                onMouseEnter={variant === RadarComponentVariant.Editable ? onMouseEnterHandler : undefined}
                onMouseLeave={variant === RadarComponentVariant.Editable ? onMouseLeaveHandler : undefined}
                opacity={opacity}
            />

            {blips}

            {gap && <RadarRingLabel x={x} y={y} segment={segment} ringName={ringName} variant={variant} />}
        </g>
    );
};

export default memo(RadarSegment);
