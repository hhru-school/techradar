import { FC, useState } from 'react';
import { Tooltip } from '@mui/material';

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
    const [open, setOpen] = useState(false);

    const activeId = useAppSelector((state) => state.activeBlip.id);
    const dispatch = useAppDispatch();

    const isActive = activeId === id;
    const classes = isActive ? `${styles.blip} ${styles.blipActive}` : styles.blip;

    const mouseEnterHandler = () => {
        dispatch(setActiveBlip(id));
        setOpen(true);
    };

    const mouseLeaveHandler = () => {
        dispatch(clearActiveBlip());
        setOpen(false);
    };

    const onClickHandler = (event: React.SyntheticEvent) => {
        event.stopPropagation();
    };

    return (
        <Tooltip open={open || isActive} title={name} arrow>
            <g
                className={classes}
                onMouseEnter={mouseEnterHandler}
                onMouseLeave={mouseLeaveHandler}
                onClick={onClickHandler}
            >
                <circle cx={x} cy={y} r={r}></circle>
                <text x={x} y={y} textAnchor="middle" dominantBaseline="middle" className={styles.blipText}>
                    {id}
                </text>
            </g>
        </Tooltip>
    );
};

export default RadarBlip;
