import { FC } from 'react';
import { Link } from 'react-router-dom';

import { buildDisplayBlipEventUrl } from '../../../api/radarApiUtils';
import { useAppSelector } from '../../../store/hooks';

import styles from './radarLogContainer.module.less';

const getFormatDate = (date: string): string => new Date(date).toLocaleTimeString();

const RadarLogContainer: FC = () => {
    const logData = useAppSelector((state) => state.editRadar.log);

    const log = logData
        ?.map((item) => (
            <Link to={buildDisplayBlipEventUrl(item.id)} key={item.id}>
                <li> {`> [Событие] ${item.id} ${getFormatDate(item.creationTime)}`} </li>
            </Link>
        ))
        .reverse();

    return <div className={styles.container}>{log && <ul>{log}</ul>}</div>;
};

export default RadarLogContainer;
