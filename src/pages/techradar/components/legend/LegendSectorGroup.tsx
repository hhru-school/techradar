import { FC } from 'react';

import { Blip } from '../../../../components/radar/types';
import LegendRingGroup from './LegendRingGroup';

import styles from './legend.module.less';

type Props = { blips: Blip[]; sectorName: string; ringNames: string[]; color: string };

const LegendSectorGroup: FC<Props> = ({ blips, sectorName, ringNames, color }) => {
    const ringGroups = ringNames.map((ringName) => (
        <li>
            <LegendRingGroup blips={blips.filter((blip) => blip.ringName === ringName)} ringName={ringName} />
        </li>
    ));

    return (
        <div className={styles.sectorGroupContainer}>
            <h3 className={styles.sectorGroupHeader} style={{ color }}>
                {sectorName}
            </h3>
            <ul className={styles.sectorGroup}>{ringGroups}</ul>
        </div>
    );
};

export default LegendSectorGroup;