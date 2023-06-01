import { FC } from 'react';

import { useAppSelector } from '../../../store/hooks';
import LogList from '../../admin/components/logList/LogList';

import styles from './radarLogContainer.module.less';

const RadarLogContainer: FC = () => {
    const logData = useAppSelector((state) => state.editRadar.log);

    return (
        <div className={styles.container}>
            {logData && <LogList blipEvents={logData} boxWidth={'90%'} boxMaxHeight={'500px'} hasHeader={false} />}
        </div>
    );
};

export default RadarLogContainer;
