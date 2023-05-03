import { FC } from 'react';

import Radar from '../../../../components/radar/Radar';
import { RadarComponentVariant } from '../../../../components/radar/types';

import styles from './radarConstructorContainer.module.less';

// const defaultRingNames = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth'];

const RadarConstructorContainer: FC = () => {
    return (
        <div className={styles.xxx}>
            <Radar
                sectorNames={['1', '2', '3', '4']}
                ringNames={['aaa', 'bbb', 'ccc']}
                radius={280}
                variant={RadarComponentVariant.Editable}
            />
        </div>
    );
};

export default RadarConstructorContainer;
