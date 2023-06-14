import { FC } from 'react';

import { IndexBlipEventApi } from '../../../api/types';

import styles from './item.module.less';

type Props = {
    blipEvent: IndexBlipEventApi;
};

const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    return `${date.toLocaleDateString()} ${date.getHours()}:${date.getMinutes()}`;
};

const LogItem: FC<Props> = ({ blipEvent }) => {
    return (
        <li className={styles.container}>
            <div className={styles.date}>{formatDate(blipEvent.creationTime)}</div>
            <div className={styles.name}> {blipEvent.blip?.name} </div>
        </li>
    );
};

export default LogItem;
