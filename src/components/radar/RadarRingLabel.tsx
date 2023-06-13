import { FC, useCallback, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import { openEditRingModal, setShowEditIcon } from '../../store/editRadarSlice';
import { useAppDispatch } from '../../store/hooks';
import { RadarVariant, Ring, Segment } from './types';
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
    ring: Ring;
    variant?: RadarVariant;
};

const getTransform = (startAngle: number, x: number, y: number) =>
    `rotate(${-convertRadToDeg(startAngle)}  0 0) rotate(${textRotation(startAngle)} ${x} ${y})`;

const RadarRingLabel: FC<Props> = ({ x, y, segment, ring, variant = RadarVariant.Demonstrative }) => {
    const isEditable = variant === RadarVariant.Editable;

    const dispatch = useAppDispatch();

    const clickHandler = () => {
        dispatch(openEditRingModal(ring));
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

    const segmentWidth = segment.outerRadius - segment.innerRadius;

    const ref = useRef<SVGTextElement>(null);

    const [textValue, setTextValue] = useState(ring.name);

    useEffect(() => {
        if (ref.current) {
            if (ref.current.getComputedTextLength() > segmentWidth - 20) {
                setTextValue(`${ring.name.slice(0, 3)}...`);
            } else setTextValue(ring.name);
        }
    }, [ring.name, segmentWidth]);

    return (
        <g transform={getTransform(segment.startAngle, x, y)}>
            <text
                ref={ref}
                onClick={isEditable ? clickHandler : undefined}
                onMouseEnter={isEditable ? mouseEnterHandler : undefined}
                onMouseLeave={isEditable ? mouseLeaveHandler : undefined}
                className={classes}
                textAnchor="middle"
                dominantBaseline="middle"
                x={x}
                y={y}
            >
                {textValue}
            </text>
        </g>
    );
};

export default RadarRingLabel;
