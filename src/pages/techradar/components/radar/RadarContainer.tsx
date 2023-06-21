import { FC } from 'react';
import { Skeleton } from '@mui/material';

import Radar from '../../../../components/radar/Radar';
import { RadarVariant } from '../../../../components/radar/types';
import SymbolLegend from '../../../../components/symbolLegend/SymbolLegend';
import { useAppSelector } from '../../../../store/hooks';
import SectorControlPanel from './controls/SectorControlPanel';
import SelectVersion from './selectMenu/SelectVersion';

import styles from './radar.module.less';

const style = {
    constrolSkeleton: { height: 32, width: 400, borderRadius: 16 },
    selectSceleton: { height: 50, width: 300, my: 1 },
};

const radius = 400;

const RadarContainer: FC = () => {
    const radar = useAppSelector((state) => state.displayRadar.radar);
    const { versions, currentVersionId } = useAppSelector((state) => state.displayRadar.versionAsset);
    const companyId = useAppSelector((state) => state.displayRadar.companyId);

    return (
        <div className={styles.container}>
            <div className={styles.selectContainer}>
                {versions && currentVersionId >= 0 ? (
                    <SelectVersion versions={versions} currentVersionId={currentVersionId} companyId={companyId} />
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
            <SymbolLegend />
            <div className={styles.radarContainer}>
                {radar ? (
                    <Radar radar={radar} radius={radius} blipRadus={12} variant={RadarVariant.Demonstrative} />
                ) : (
                    <Skeleton variant="circular" width={2 * radius} height={2 * radius} />
                )}
            </div>
        </div>
    );
};

export default RadarContainer;
