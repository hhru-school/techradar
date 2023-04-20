import { FC } from 'react';

import { Blip } from '../../../../components/radar/types';
import { useAppSelector } from '../../../../store/hooks';
import LegendSectorGroup from './LegendSectorGroup';

import styles from './legend.module.less';

type Props = { blips: Blip[]; ringNames: string[]; sectorNames: string[]; colorScheme: string[] };

const Legend: FC<Props> = ({ blips, ringNames, sectorNames, colorScheme }) => {
    const hoveredSector = useAppSelector((state) => state.activeSector.hoveredSectorName);
    const activeSector = useAppSelector((state) => state.activeSector.activeSectorName);

    const sectorGroups = sectorNames.map((sectorName, i) => {
        if (activeSector && activeSector !== sectorName) return null;
        return (
            <LegendSectorGroup
                blips={blips.filter((blip) => blip.sectorName === sectorName)}
                sectorName={sectorName}
                ringNames={ringNames}
                color={colorScheme[i]}
                opacity={hoveredSector && hoveredSector !== sectorName ? 0.2 : 1}
            />
        );
    });
    return <div className={styles.legendContainer}>{sectorGroups}</div>;
};

export default Legend;
