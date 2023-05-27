import { FC } from 'react';

import { defaultColorScheme } from '../../../../components/radar/styleConfig';
import { Sector } from '../../../../components/radar/types';
import SectorControlChip from './SectorControlChip';

import styles from './controls.module.less';

type Props = { sectors: Sector[]; colorScheme?: string[] };

const SectorControlPanel: FC<Props> = ({ sectors, colorScheme = defaultColorScheme }) => {
    const chips = sectors.map((sector, i) => (
        <SectorControlChip key={sector.id} sector={sector} color={colorScheme[i]} />
    ));

    return <div className={styles.sectorControlContainer}>{chips}</div>;
};

export default SectorControlPanel;
