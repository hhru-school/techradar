import { FC, useMemo } from 'react';

import { IndexBlipEventApi } from '../../../api/types';
import { useAppSelector } from '../../../store/hooks';
import LogItem from './LogItem';

import styles from './log.module.less';

type Props = {
    blipEvents: IndexBlipEventApi[];
    versionName: string;
};

const initVersionName = '_init_';

const LogVersionGroup: FC<Props> = ({ blipEvents, versionName }) => {
    const currentVersionName = useAppSelector((state) => state.editRadar.version.name);

    const items = useMemo(
        () => blipEvents.map((blipEvent) => <LogItem key={blipEvent.id} blipEvent={blipEvent} />),
        [blipEvents]
    );
    return (
        <>
            {versionName !== initVersionName && (
                <div className={styles.versionName}>
                    {versionName} {versionName === currentVersionName && <span> (текущая)</span>}
                </div>
            )}
            {items}
        </>
    );
};

export default LogVersionGroup;
