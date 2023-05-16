import { FC, useMemo } from 'react';

import { Blip } from '../../../../components/radar/types';
import LegendRingGroup from './LegendRingGroup';

import styles from './legend.module.less';

type Props = {
    blips: Blip[];
    sectorName: string;
    ringNames: string[];
    color: string;
    opacity: number;
};

const LegendSectorGroup: FC<Props> = ({ blips, sectorName, ringNames, color, opacity }) => {
    const ringGroups = useMemo(
        () =>
            ringNames.map((ringName) => (
                <li key={ringName}>
                    <LegendRingGroup blips={blips.filter((blip) => blip.ringName === ringName)} ringName={ringName} />
                </li>
            )),
        [blips, ringNames]
    );

    return (
        <div className={styles.sectorGroupContainer} style={{ opacity }}>
            <h3 className={styles.sectorGroupHeader} style={{ color }}>
                {sectorName}
            </h3>
            <ul className={styles.sectorGroup}>{ringGroups}</ul>
        </div>
    );
};

export default LegendSectorGroup;
