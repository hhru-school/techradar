import { FC, memo } from 'react';

import { IndexBlipEventApi } from '../../../api/types';
import LogVersionGroup from './LogVersionGroup';

import styles from './log.module.less';

type Props = {
    blipEvents: IndexBlipEventApi[];
};

const Log: FC<Props> = ({ blipEvents }) => {
    const blipEventsReversed = [...blipEvents].reverse();

    const versions = blipEventsReversed
        .map((blipEvent) => blipEvent.radarVersion)
        .filter((item, i, ar) => ar.indexOf(item) === i);

    const groups = versions.map((version) =>
        blipEventsReversed.filter((blipEvent) => blipEvent.radarVersion === version)
    );

    const items = groups.map((group, i) => (
        <LogVersionGroup key={i} versionName={group[0].radarVersion} blipEvents={group} />
    ));

    return <div className={styles.list}>{items}</div>;
};

export default memo(Log);
