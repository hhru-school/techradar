import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Radar from '../../components/radar/Radar';
import { defaultColorScheme, defaultGap } from '../../components/radar/styleConfig';
import { FormattedData, formatApiData, loadRadar } from './api';
import SectorControlPanel from './components/controls/SectorControlPanel';
import Legend from './components/legend/Legend';

import styles from './radar.module.less';

const TechRadar: FC = () => {
    const { radar } = useParams();

    const [data, setData] = useState<FormattedData | null>(null);

    useEffect(() => {
        if (radar)
            loadRadar(radar)
                .then((apiData) => {
                    setData(formatApiData(apiData));
                })
                .catch(() => console.error);
    }, [radar]);

    return (
        <>
            {data && (
                <div className={styles.mainContainer}>
                    <div className={styles.radarContainer}>
                        <SectorControlPanel sectorNames={data.sectorNames} colorScheme={defaultColorScheme} />
                        <Radar
                            sectorNames={data.sectorNames}
                            ringNames={data.ringNames}
                            radius={300}
                            gap={defaultGap}
                            colorScheme={defaultColorScheme}
                            data={data.blips}
                        />
                    </div>
                    <div>
                        <Legend
                            blips={data.blips}
                            ringNames={data.ringNames}
                            sectorNames={data.sectorNames}
                            colorScheme={defaultColorScheme}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default TechRadar;
