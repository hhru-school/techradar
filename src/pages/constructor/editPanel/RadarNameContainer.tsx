import { FC } from 'react';

import EditButton from '../components/EditButton';

import styles from './radarNameEditor.module.less';

const RadarNameContainer: FC = () => {
    return (
        <div>
            <div className={styles.headerLabel}>Название</div>
            <div className={styles.headerContainer}>
                <h2 className={styles.header}>Hello World!</h2>
                <EditButton />
            </div>
        </div>
    );
};

export default RadarNameContainer;
