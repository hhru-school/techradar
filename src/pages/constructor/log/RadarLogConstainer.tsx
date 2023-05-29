import { FC } from 'react';

import { useGetBlipEventsForRadarQuery } from '../../../api/companyRadarsApi';
import { useAppSelector } from '../../../store/hooks';

import styles from './radarLogContainer.module.less';

const getFormatDate = (date: string): string => new Date(date).toLocaleTimeString();

const RadarLogContainer: FC = () => {
    const currentBlipEventId = useAppSelector((state) => state.editRadar.version?.blipEventId);
    const { data } = useGetBlipEventsForRadarQuery(currentBlipEventId || -1, { skip: !currentBlipEventId });

    const log = data
        ?.map((item) => <li> {`> [Событие] ${item.id} ${getFormatDate(item.creationTime)}`} </li>)
        .reverse();

    return <div className={styles.container}>{log && <ul>{log}</ul>}</div>;
};

export default RadarLogContainer;
