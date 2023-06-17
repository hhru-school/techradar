import { FC, memo } from 'react';

import { IndexBlipEventApi } from '../../../api/types';
import LogItem from './LogItem';

import styles from './log.module.less';

type Props = {
    blipEvents: IndexBlipEventApi[];
};

const Log: FC<Props> = ({ blipEvents }) => {
    const items = blipEvents.map((blipEvent) => <LogItem key={blipEvent.id} blipEvent={blipEvent} />).reverse();
    return <div className={styles.list}>{items}</div>;
};

export default memo(Log);
