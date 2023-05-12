import { FC, useCallback, useState } from 'react';
import classNames from 'classnames';

import { openEditRingNameModal, setShowEditIcon } from '../../store/editRadarSlice';
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

const getTransform = (startAngle: number, x: number, y: number) =>
    `rotate(${-convertRadToDeg(startAngle)}  0 0) rotate(${textRotation(startAngle)} ${x} ${y})`;

const RadarRingLabel: FC<Props> = ({ x, y, segment, ringName, variant = RadarComponentVariant.Demonstrative }) => {
    const isEditable = variant === RadarComponentVariant.Editable;

    const dispatch = useAppDispatch();

    const doubleClickHandler = () => {
        dispatch(openEditRingNameModal(ringName));
    };

    const [isActive, setIsActive] = useState(false);

    const classes = classNames(styles.ringName, {
        [styles.ringNameActive]: isActive,
    });

    const mouseEnterHandler = useCallback(() => {
        setIsActive(true);
        dispatch(setShowEditIcon(true));
    }, [dispatch]);

    const mouseLeaveHandler = useCallback(() => {
        setIsActive(false);
        dispatch(setShowEditIcon(false));
    }, [dispatch]);

    return (
        <text
            onDoubleClick={isEditable ? doubleClickHandler : undefined}
            onMouseEnter={isEditable ? mouseEnterHandler : undefined}
            onMouseLeave={isEditable ? mouseLeaveHandler : undefined}
            className={classes}
            textAnchor="middle"
            dominantBaseline="middle"
            x={x}
            y={y}
            transform={getTransform(segment.startAngle, x, y)}
        >
            {ringName}
        </text>
    );
};

export default RadarRingLabel;
