import { FC } from 'react';
import { useParams } from 'react-router-dom';

import { useGetAllCompanyRadarsQuery, useGetRadarQuery } from '../../api/companyRadarsApi';
import Radar from '../../components/radar/Radar';
import { defaultColorScheme, defaultGap } from '../../components/radar/styleConfig';
import SectorControlPanel from './components/controls/SectorControlPanel';
import Legend from './components/legend/Legend';
import RadarsNavTabs from './components/radars-tab/RadarsNavTabs';

import styles from './radar.module.less';

const TechRadar: FC = () => {
    const { companyId, radarId } = useParams();

    const { data: radars } = useGetAllCompanyRadarsQuery(Number(companyId));
    const { data: radar } = useGetRadarQuery(Number(radarId), { refetchOnMountOrArgChange: true });

    return (
        <>
            {radars && <RadarsNavTabs radarId={Number(radarId)} companyId={Number(companyId)} radars={radars} />}
            {radar && (
                <div key={Number(radarId)} className={styles.mainContainer}>
                    <div className={styles.radarContainer}>
                        <SectorControlPanel sectorNames={radar.sectorNames} colorScheme={defaultColorScheme} />
                        <Radar
                            sectorNames={radar.sectorNames}
                            ringNames={radar.ringNames}
                            radius={300}
                            gap={defaultGap}
                            colorScheme={defaultColorScheme}
                            data={radar.blips}
                        />
                    </div>
                    <div>
                        <Legend
                            blips={radar.blips}
                            ringNames={radar.ringNames}
                            sectorNames={radar.sectorNames}
                            colorScheme={defaultColorScheme}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default TechRadar;
