import { FC } from 'react';

import { openEditRingNameModal } from '../../store/editRadarSlice';
import { useAppDispatch } from '../../store/hooks';
import { RadarComponentVariant, Segment } from './types';
import { convertRadToDeg } from './utils';

import styles from './radar.module.less';

const textRotation = (rotationAngle: number): number => {
    const d = convertRadToDeg(rotationAngle);
    return d > 90 && d <= 270 ? 180 : 0;
};

type Props = {
    x: number;
    y: number;
    segment: Segment;
    ringName: string;
    variant?: RadarComponentVariant;
};

const RadarSegmentLabel: FC<Props> = ({ x, y, segment, ringName, variant = RadarComponentVariant.Demonstrative }) => {
    const dispatch = useAppDispatch();

    const doubleClickHandler = () => {
        dispatch(openEditRingNameModal(ringName));
    };

    return (
        <text
            onDoubleClick={variant === RadarComponentVariant.Editable ? doubleClickHandler : undefined}
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
    );
};

export default RadarSegmentLabel;
