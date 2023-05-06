import { FC, memo, useMemo, useState } from 'react';

import { clearActiveSegment, setActiveSegment } from '../../store/editRadarSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import RadarBlip from './RadarBlip';
import packEntries from './packEngine';
import { Blip, Entry, RadarComponentVariant, Segment } from './types';
import { convertRadToDeg, getRandomPoint, translateSegmentToD3 } from './utils';

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

const textRotation = (rotationAngle: number): number => {
    const d = convertRadToDeg(rotationAngle);
    return d > 90 && d <= 270 ? 180 : 0;
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

    // //DnDLogic

    const dispatch = useAppDispatch();
    const [isActive, setIsActive] = useState(false);
    const isDragging = useAppSelector((state) => state.editRadar.isDragging);

    const onMouseEnterHandler = () => {
        if (variant === RadarComponentVariant.Editable) {
            setIsActive(true);
            dispatch(setActiveSegment({ ringName, sectorName }));
        }
    };

    const onMouseLeaveHandler = () => {
        if (variant === RadarComponentVariant.Editable) {
            setIsActive(false);
            dispatch(clearActiveSegment());
        }
    };

    // ///////////////////

    let opacity = 1;

    if (variant === RadarComponentVariant.Editable && isDragging) {
        opacity = isActive ? 1 : 0.3;
    }

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

            {gap && (
                <text
                    className={styles.ringName}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    x={x}
                    y={y}
                    transform={`rotate(${-convertRadToDeg(segment.startAngle)}  0 0) rotate(${textRotation(
                        segment.startAngle
                    )} ${x} ${y})`}
                >
                    {ringName}
                </text>
            )}
        </g>
    );
};

export default memo(RadarSegment);
