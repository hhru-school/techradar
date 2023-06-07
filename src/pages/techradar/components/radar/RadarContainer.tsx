import { FC } from 'react';
import { Skeleton } from '@mui/material';

import Radar from '../../../../components/radar/Radar';
import { RadarVariant } from '../../../../components/radar/types';
import { useAppSelector } from '../../../../store/hooks';
import SectorControlPanel from './controls/SectorControlPanel';
import SelectVersion from './selectMenu/SelectVersion';

import styles from './radar.module.less';

// type Props = {
//     radar: RadarInterface | n;
//     versions: VersionApiResponse[];
//     currentVersion: VersionApiResponse;
// };

const style = {
    constrolSkeleton: { height: 32, width: 400, borderRadius: 16 },
    selectSceleton: { height: 50, width: 300, my: 1 },
};

const radius = 250;

const RadarContainer: FC = () => {
    const radar = useAppSelector((state) => state.displayRadar.radar);
    const version = useAppSelector((state) => state.displayRadar.version);
    const versions = useAppSelector((state) => state.displayRadar.versions);

    const areVersionsAvailable = version && versions;

    return (
        <div className={styles.container}>
            <div className={styles.selectContainer}>
                {areVersionsAvailable ? (
                    <SelectVersion versions={versions} version={version} companyId={1} />
                ) : (
                    <Skeleton variant="rectangular" sx={style.selectSceleton} />
                )}
            </div>
            <div className={styles.controlContainer}>
                {radar ? (
                    <SectorControlPanel sectors={radar.sectors} />
                ) : (
                    <Skeleton variant="rectangular" sx={style.constrolSkeleton} />
                )}
            </div>

            <div className={styles.radarContainer}>
                {radar ? (
                    <Radar radar={radar} radius={radius} variant={RadarVariant.Demonstrative} />
                ) : (
                    <Skeleton variant="circular" width={2 * radius} height={2 * radius} />
                )}
            </div>
        </div>
    );
};

export default RadarContainer;
