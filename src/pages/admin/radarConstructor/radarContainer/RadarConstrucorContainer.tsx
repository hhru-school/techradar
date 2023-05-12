import { FC } from 'react';

import Radar from '../../../../components/radar/Radar';
import { RadarComponentVariant } from '../../../../components/radar/types';
import { useAppSelector } from '../../../../store/hooks';

import styles from './radarConstructorContainer.module.less';

const RadarConstructorContainer: FC = () => {
    const sectorNames = useAppSelector((state) => state.constructorRadar.sectorNames);
    const ringNames = useAppSelector((state) => state.constructorRadar.ringNames);
    const blips = useAppSelector((state) => state.constructorRadar.blips);

    return (
        <div className={styles.container}>
            <Radar
                sectorNames={sectorNames}
                ringNames={ringNames}
                radius={250}
                data={blips}
                variant={RadarComponentVariant.Editable}
            />
        </div>
    );
};

export default RadarConstructorContainer;
