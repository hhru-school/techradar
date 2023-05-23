import { FC } from 'react';

import { BasicRadarData } from '../../api/radarApiUtils';
import RadarBaseEditPanel from './editPanel/RadarBaseEditPanel';
import EditWrapper from './radarContainer/EditWrapper';

import styles from './editContainer.module.less';

type Props = {
    radar: BasicRadarData;
};

const EditContainer: FC<Props> = ({ radar }) => {
    return (
        <div className={styles.layout}>
            <RadarBaseEditPanel sectorNames={radar.sectorNames} ringNames={radar.ringNames} />
            <EditWrapper radar={radar} />
        </div>
    );
};

export default EditContainer;
