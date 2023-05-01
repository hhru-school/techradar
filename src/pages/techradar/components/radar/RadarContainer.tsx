import { FC } from 'react';
import { Skeleton } from '@mui/material';

import { FormattedRadarData } from '../../../../api/radarApiUtils';
import Radar from '../../../../components/radar/Radar';
import SectorControlPanel from '../controls/SectorControlPanel';

import styles from './radar.module.less';

type Props = {
    radar?: FormattedRadarData;
    isLoading?: boolean;
};

const controlSceletonSx = { height: 32, width: 400, borderRadius: 16 };

const radius = 250;

const RadarContainer: FC<Props> = ({ radar, isLoading = false }) => {
    return (
        <div className={styles.container}>
            <div className={styles.controlContainer}>
                {!isLoading && radar && <SectorControlPanel sectorNames={radar.sectorNames} />}
                {isLoading && <Skeleton variant="rectangular" sx={controlSceletonSx} />}
            </div>
            <div className={styles.radarContainer}>
                {!isLoading && radar && (
                    <Radar
                        sectorNames={radar.sectorNames}
                        ringNames={radar.ringNames}
                        data={radar.blips}
                        radius={radius}
                    />
                )}
                {isLoading && <Skeleton variant="circular" width={2 * radius} height={2 * radius} />}
            </div>
        </div>
    );
};

export default RadarContainer;
