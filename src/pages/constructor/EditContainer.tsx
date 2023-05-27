import { FC } from 'react';

import { RadarInterface } from '../../components/radar/types';
import RadarBaseEditPanel from './editPanel/RadarBaseEditPanel';
import EditWrapper from './radarContainer/EditWrapper';

import styles from './editContainer.module.less';

type Props = {
    radar: RadarInterface;
};

const EditContainer: FC<Props> = ({ radar }) => {
    return (
        <div className={styles.layout}>
            <RadarBaseEditPanel sectors={radar.sectors} rings={radar.rings} />
            <EditWrapper radar={radar} />
        </div>
    );
};

export default EditContainer;
