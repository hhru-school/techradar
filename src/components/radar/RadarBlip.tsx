import { FC } from 'react';
import { Tooltip } from '@mui/material';

import styles from './radar.module.less';

type Props = {
    id: number;
    description: string;
    r: number;
    x: number;
    y: number;
};

const RadarBlip: FC<Props> = ({ id, description, x, y, r }) => {
    return (
        <Tooltip title={description}>
            <g className={styles.blip}>
                <circle cx={x} cy={y} r={r}></circle>
                <text x={x} y={y} textAnchor="middle" dominantBaseline="middle" className={styles.blipText}>
                    {id}
                </text>
            </g>
        </Tooltip>
    );
};

export default RadarBlip;
