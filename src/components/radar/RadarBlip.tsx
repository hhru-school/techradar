import { FC, useCallback } from 'react';
import Tooltip from '@mui/material/Tooltip/Tooltip';
import classNames from 'classnames';

import { clearActiveBlip, setActiveBlip } from '../../store/activeBlipSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

import styles from './radar.module.less';

type Props = {
    id: number;
    name: string;
    r: number;
    x: number;
    y: number;
};

const RadarBlip: FC<Props> = ({ id, name, x, y, r }) => {
    const activeId = useAppSelector((state) => state.activeBlip.id);
    const isTransforming = useAppSelector((state) => state.activeSector.isTransforming);

    const dispatch = useAppDispatch();

    const isActive = activeId === id;

    const classes = isActive ? classNames(styles.blip, styles.blipActive) : styles.blip;

    const mouseEnterHandler = useCallback(() => {
        dispatch(setActiveBlip(id));
    }, [dispatch, id]);

    const mouseLeaveHandler = useCallback(() => {
        dispatch(clearActiveBlip());
    }, [dispatch]);

    const onClickHandler = (event: React.SyntheticEvent) => {
        event.stopPropagation();
    };

    return (
        <Tooltip key={Number(isTransforming)} open={isActive && !isTransforming} title={name} arrow>
            <g
                className={classes}
                onMouseEnter={mouseEnterHandler}
                onMouseLeave={mouseLeaveHandler}
                onClick={onClickHandler}
            >
                <circle cx={x} cy={y} r={r} strokeWidth={r / 8}></circle>
                <text
                    x={x}
                    y={y}
                    fontSize={`${0.7 * 2 * r}px`}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className={styles.blipText}
                >
                    {id}
                </text>
            </g>
        </Tooltip>
    );
};

export default RadarBlip;
