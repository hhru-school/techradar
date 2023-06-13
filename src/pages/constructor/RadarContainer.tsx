import { FC } from 'react';

import { RadarInterface } from '../../components/radar/types';
import EditWrapper from './radarContainer/EditWrapper';

import styles from './editContainer.module.less';

type Props = {
    radar: RadarInterface;
};

const RadarContainer: FC<Props> = ({ radar }) => {
    return (
        <div className={styles.layout}>
            <EditWrapper radar={radar} />
        </div>
    );
};

export default RadarContainer;
