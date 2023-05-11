import { FC } from 'react';

import EditButton from '../components/EditButton';

import styles from './radarNameEditor.module.less';

const RadarNameContainer: FC = () => {
    return (
        <div className={styles.container}>
            <div>
                <h2 className={styles.header}>Hello World!</h2>
            </div>
            <EditButton />
        </div>
    );
};

export default RadarNameContainer;
