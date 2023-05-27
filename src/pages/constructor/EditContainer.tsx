import { FC } from 'react';

import { RadarInterface } from '../../components/radar/types';
import { ConstructorMode } from '../../store/editRadarSlice';
import { useAppSelector } from '../../store/hooks';
import RadarBaseEditPanel from './editPanel/RadarBaseEditPanel';
import EditWrapper from './radarContainer/EditWrapper';

import styles from './editContainer.module.less';

type Props = {
    radar: RadarInterface;
};

const EditContainer: FC<Props> = ({ radar }) => {
    const mode = useAppSelector((state) => state.editRadar.mode);

    const isNewRadar = mode === ConstructorMode.NewRadarCreation;

    return (
        <div className={styles.layout}>
            {isNewRadar && <RadarBaseEditPanel sectors={radar.sectors} rings={radar.rings} />}
            <EditWrapper radar={radar} />
        </div>
    );
};

export default EditContainer;
