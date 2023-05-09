import { FC, useCallback, useState } from 'react';
import classNames from 'classnames';

import { openEditSectorNameModal, setShowEditIcon } from '../../store/editRadarSlice';
import { useAppDispatch } from '../../store/hooks';
import { sectorNameFontSize, sectorNameTextOffset } from './styleConfig';
import { RadarComponentVariant } from './types';
import { buildArc } from './utils';

import styles from './radar.module.less';

type Props = {
    sectorName: string;
    startAngle: number;
    sweepAngle: number;
    radius: number;
    variant: RadarComponentVariant;
};

const RadarSectorLabel: FC<Props> = ({
    sectorName,
    startAngle,
    sweepAngle,
    radius,
    variant = RadarComponentVariant.Demonstrative,
}) => {
    const isEditable = variant === RadarComponentVariant.Editable;

    const dispatch = useAppDispatch();

    const doubleClickHandler = () => {
        dispatch(openEditSectorNameModal(sectorName));
    };

    const [isActive, setIsActive] = useState(false);

    const classes = isActive ? classNames(styles.sectorName, styles.sectorNameActive) : styles.sectorName;

    const mouseEnterHandler = useCallback(() => {
        if (isEditable) {
            dispatch(setShowEditIcon(true));
        }
        setIsActive(true);
    }, [dispatch, isEditable]);

    const mouseLeaveHandler = useCallback(() => {
        if (isEditable) {
            dispatch(setShowEditIcon(false));
        }
        setIsActive(false);
    }, [dispatch, isEditable]);

    return (
        <>
            <path
                id={`curve-${sectorName}`}
                fill="transparent"
                d={buildArc(startAngle, startAngle + sweepAngle, radius)}
            />
            <text
                fontSize={sectorNameFontSize}
                onDoubleClick={isEditable ? doubleClickHandler : undefined}
                onMouseEnter={mouseEnterHandler}
                onMouseLeave={mouseLeaveHandler}
            >
                <textPath
                    xlinkHref={`#curve-${sectorName}`}
                    dominantBaseline="middle"
                    className={classes}
                    startOffset="50%"
                >
                    <tspan dy={-sectorNameTextOffset}>{sectorName}</tspan>
                </textPath>
            </text>
        </>
    );
};

export default RadarSectorLabel;
