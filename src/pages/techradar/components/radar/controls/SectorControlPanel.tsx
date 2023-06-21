import { FC } from 'react';

import { Sector } from '../../../../../components/radar/types';
import SectorControlChip from './SectorControlChip';

import styles from './controls.module.less';

type Props = { sectors: Sector[] };

const color = 'rgb(215, 215, 215)';

const SectorControlPanel: FC<Props> = ({ sectors }) => {
    const chips = sectors.map((sector) => <SectorControlChip key={sector.id} sector={sector} color={color} />);

    return <div className={styles.sectorControlContainer}>{chips}</div>;
};

export default SectorControlPanel;
