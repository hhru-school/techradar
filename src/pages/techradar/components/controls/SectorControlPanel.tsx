import { FC } from 'react';

import SectorControlChip from './SectorControlChip';

import styles from './controls.module.less';

type Props = { sectorNames: string[]; colorScheme: string[] };

const SectorControlPanel: FC<Props> = ({ sectorNames, colorScheme }) => {
    const chips = sectorNames.map((sectorName, i) => (
        <SectorControlChip sectorName={sectorName} color={colorScheme[i]} />
    ));

    return <div className={styles.sectorControlContainer}>{chips}</div>;
};

export default SectorControlPanel;
