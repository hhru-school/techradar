import { FC } from 'react';

import Radar from '../../components/radar/Radar';
import { RadarInterface, RadarVariant } from '../../components/radar/types';
import { ConstructorMode } from '../../store/editRadarSlice';
import { useAppSelector } from '../../store/hooks';
import RadarBaseEditPanel from './editPanel/RadarBaseEditPanel';
import EditWrapper from './radarContainer/EditWrapper';

import styles from './editContainer.module.less';

type Props = {
    radar: RadarInterface;
};

const RadarContainer: FC<Props> = ({ radar }) => {
    const mode = useAppSelector((state) => state.editRadar.mode);

    const isNewRadar = mode === ConstructorMode.NewRadarCreation;
    const isBlipEventDisplay = mode === ConstructorMode.DisplayEvent;

    if (isBlipEventDisplay) {
        return (
            <div className={styles.layout}>
                <Radar radar={radar} radius={250} variant={RadarVariant.Demonstrative} />
            </div>
        );
    }
    return (
        <div className={styles.layout}>
            {isNewRadar && <RadarBaseEditPanel sectors={radar.sectors} rings={radar.rings} />}
            <EditWrapper radar={radar} />
        </div>
    );
};

export default RadarContainer;
