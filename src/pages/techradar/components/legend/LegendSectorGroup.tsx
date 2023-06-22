import { FC, useMemo } from 'react';

import { Blip } from '../../../../components/radar/types';
import LegendRingGroup from './LegendRingGroup';

import styles from './legend.module.less';

type Props = {
    blips: Blip[];
    sectorName: string;
    ringNames: string[];
    colorScheme: string[];
    opacity: number;
};

const LegendSectorGroup: FC<Props> = ({ blips, sectorName, ringNames, colorScheme, opacity }) => {
    const ringGroups = useMemo(
        () =>
            ringNames.map((ringName, i) => (
                <li key={ringName}>
                    <LegendRingGroup
                        blips={blips.filter((blip) => blip.ring.name === ringName)}
                        ringName={ringName}
                        color={colorScheme[i]}
                    />
                </li>
            )),
        [blips, ringNames, colorScheme]
    );

    return (
        <div className={styles.sectorGroupContainer} style={{ opacity }}>
            <h3 className={styles.sectorGroupHeader}>{sectorName}</h3>
            <ul className={styles.sectorGroup}>{ringGroups}</ul>
        </div>
    );
};

export default LegendSectorGroup;
