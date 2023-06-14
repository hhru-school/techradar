import { FC, useMemo } from 'react';

import { IndexBlipEventApi } from '../../../api/types';
import LogItem from './LogItem';

import styles from './log.module.less';

type Props = {
    blipEvents: IndexBlipEventApi[];
};

const Log: FC<Props> = ({ blipEvents }) => {
    const items = useMemo(
        () => blipEvents.map((blipEvent) => <LogItem key={blipEvent.id} blipEvent={blipEvent} />),
        [blipEvents]
    ).reverse();
    return <div className={styles.list}>{items}</div>;
};

export default Log;
