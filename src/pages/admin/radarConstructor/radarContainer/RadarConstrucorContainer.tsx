import { FC } from 'react';

import Radar from '../../../../components/radar/Radar';
import { RadarComponentVariant } from '../../../../components/radar/types';
import { useAppSelector } from '../../../../store/hooks';

import styles from './radarConstructorContainer.module.less';

const RadarConstructorContainer: FC = () => {
    const ringsNumber = useAppSelector((state) => state.constructorRadar.countRingInputs);
    const sectorsNumber = useAppSelector((state) => state.constructorRadar.countSectorInputs);
    const sectorNames = useAppSelector((state) => state.constructorRadar.sectorNames);
    const ringNames = useAppSelector((state) => state.constructorRadar.ringNames);

    return (
        <div className={styles.xxx}>
            <Radar
                sectorNames={sectorNames.slice(0, sectorsNumber)}
                ringNames={ringNames.slice(0, ringsNumber)}
                radius={250}
                variant={RadarComponentVariant.Editable}
            />
        </div>
    );
};

export default RadarConstructorContainer;
