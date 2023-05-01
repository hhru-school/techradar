import { FC } from 'react';

import SectorControlChip from './SectorControlChip';

import styles from './controls.module.less';

type Props = { sectorNames?: string[]; colorScheme: string[]; isLoading?: boolean };

const SectorControlPanel: FC<Props> = ({ sectorNames, colorScheme, isLoading = false }) => {
    const chips =
        sectorNames &&
        sectorNames.map((sectorName, i) => (
            <SectorControlChip key={sectorName} sectorName={sectorName} color={colorScheme[i]} />
        ));

    return <div className={styles.sectorControlContainer}>{isLoading ? 2 : chips}</div>;
};

export default SectorControlPanel;
