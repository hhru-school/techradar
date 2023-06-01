import { FC } from 'react';
import { Skeleton } from '@mui/material';

import Radar from '../../../../components/radar/Radar';
import { RadarInterface, RadarVariant } from '../../../../components/radar/types';
import SectorControlPanel from '../controls/SectorControlPanel';

import styles from './radar.module.less';

type Props = {
    radar?: RadarInterface;
    isLoading?: boolean;
};

const style = {
    constrolSkeleton: { height: 32, width: 400, borderRadius: 16 },
};

const radius = 250;

const RadarContainer: FC<Props> = ({ radar, isLoading = false }) => {
    return (
        <div className={styles.container}>
            <div className={styles.controlContainer}>
                {!isLoading && radar && <SectorControlPanel sectors={radar.sectors} />}
                {isLoading && <Skeleton variant="rectangular" sx={style.constrolSkeleton} />}
            </div>
            <div className={styles.radarContainer}>
                {!isLoading && radar && <Radar radar={radar} radius={radius} variant={RadarVariant.Demonstrative} />}
                {isLoading && <Skeleton variant="circular" width={2 * radius} height={2 * radius} />}
            </div>
        </div>
    );
};

export default RadarContainer;
