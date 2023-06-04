import { FC } from 'react';

import { ConstructorMode } from '../../../store/editRadarSlice';
import { useAppSelector } from '../../../store/hooks';
import LogList from '../../admin/components/logList/LogList';

import styles from './radarLogContainer.module.less';

const RadarLogContainer: FC = () => {
    const logData = useAppSelector((state) => state.editRadar.log);
    const mode = useAppSelector((state) => state.editRadar.mode);

    const isNewRadar = mode === ConstructorMode.NewRadarCreation;

    if (isNewRadar) {
        return (
            <div className={styles.container}>
                <div className={styles.emptyContainer}>Лог будет доступен после сохранения радара</div>
            </div>
        );
    }
    return (
        <div className={styles.container}>
            {logData && <LogList blipEvents={logData} boxWidth={'90%'} boxMaxHeight={'500px'} hasHeader={false} />}
        </div>
    );
};

export default RadarLogContainer;
