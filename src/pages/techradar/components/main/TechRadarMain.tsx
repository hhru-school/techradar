import { FC } from 'react';

import { FormattedRadarData } from '../../../../api/radarApiUtils';
import Legend from '../legend/Legend';
import RadarContainer from '../radar/RadarContainer';

import styles from './main.module.less';

type Props = {
    radar?: FormattedRadarData;
    isLoading?: boolean;
};

const TechRadarMain: FC<Props> = ({ radar, isLoading = false }) => {
    return (
        <main>
            <div className={styles.container}>
                <RadarContainer radar={radar} isLoading={isLoading} />
                {radar && <Legend radar={radar} />}
            </div>
        </main>
    );
};

export default TechRadarMain;
