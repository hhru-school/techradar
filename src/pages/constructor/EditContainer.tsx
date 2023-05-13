import { FC } from 'react';

import { FormattedRadarData } from '../../api/radarApiUtils';
import EditPanel from './editPanel/EditPanel';
import EditWrapper from './radarContainer/EditWrapper';

import styles from './editContainer.module.less';

type Props = {
    radar: FormattedRadarData;
};

const EditContainer: FC<Props> = ({ radar }) => {
    return (
        <div className={styles.layout}>
            <EditPanel />
            <EditWrapper radar={radar} />
        </div>
    );
};

export default EditContainer;
