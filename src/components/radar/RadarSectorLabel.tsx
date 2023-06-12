import { FC, useCallback, useState } from 'react';
import classNames from 'classnames';

import { openEditSectorModal, setShowEditIcon } from '../../store/editRadarSlice';
import { useAppDispatch } from '../../store/hooks';
import { sectorNameFontSize, sectorNameTextOffset } from './styleConfig';
import { RadarVariant, Sector } from './types';
import { buildArc } from './utils';

import styles from './radar.module.less';

type Props = {
    sector: Sector;
    startAngle: number;
    sweepAngle: number;
    radius: number;
    variant: RadarVariant;
};

const RadarSectorLabel: FC<Props> = ({
    sector,
    startAngle,
    sweepAngle,
    radius,
    variant = RadarVariant.Demonstrative,
}) => {
    const isEditable = variant === RadarVariant.Editable;

    const dispatch = useAppDispatch();

    const clickHandler = () => {
        dispatch(openEditSectorModal(sector));
    };

    const [isActive, setIsActive] = useState(false);

    const classes = classNames(styles.sectorName, {
        [styles.sectorNameActive]: isActive,
    });

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
                id={`curve-${sector.name}`}
                fill="transparent"
                d={buildArc(startAngle, startAngle + sweepAngle, radius)}
            />
            <text
                fontSize={sectorNameFontSize}
                onClick={isEditable ? clickHandler : undefined}
                onMouseEnter={mouseEnterHandler}
                onMouseLeave={mouseLeaveHandler}
            >
                <textPath
                    xlinkHref={`#curve-${sector.name}`}
                    dominantBaseline="middle"
                    className={classes}
                    startOffset="50%"
                >
                    <tspan dy={-sectorNameTextOffset}>{sector.name}</tspan>
                </textPath>
            </text>
        </>
    );
};

export default RadarSectorLabel;
