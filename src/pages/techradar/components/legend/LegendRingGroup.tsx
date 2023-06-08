import { FC, useMemo } from 'react';

import { Blip } from '../../../../components/radar/types';
import LegendItem from './LegendItem';

import styles from './legend.module.less';

type Props = { blips: Blip[]; ringName: string };

const LegendRingGroup: FC<Props> = ({ blips, ringName }) => {
    const list = useMemo(
        () =>
            blips.map((blip) => {
                return (
                    <LegendItem
                        key={blip.id}
                        id={blip.id}
                        label={`${blip.label}. ${blip.name}`}
                        description={blip.description}
                    />
                );
            }),
        [blips]
    );

    return (
        <div>
            <h4 className={styles.ringGroupHeader}>{ringName}</h4>
            {list.length > 0 && <ul className={styles.ringGroup}>{list}</ul>}
            {list.length === 0 && <div className={styles.emptyContainer}>Пусто</div>}
        </div>
    );
};

export default LegendRingGroup;
