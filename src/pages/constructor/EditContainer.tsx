import { FC } from 'react';

import EditPanel from './editPanel/EditPanel';
import EditWrapper from './radarContainer/EditWrapper';

import styles from './editContainer.module.less';

const EditContainer: FC = () => {
    return (
        <div className={styles.layout}>
            <EditPanel />
            <EditWrapper />
        </div>
    );
};

export default EditContainer;
