import { FC, memo, useMemo } from 'react';

import { Blip, Ring, Sector } from '../../../components/radar/types';
import EditableLegendRingContainer from './EditableLegendRingContainer';

import styles from './legend.module.less';

type Props = {
    sector: Sector;
    rings: Ring[];
    blips: Blip[];
    color?: string;
    isSearching?: boolean;
};

const EditableLegendSectorContainer: FC<Props> = ({ sector, rings, blips, color, isSearching = false }) => {
    const ringContainers = useMemo(
        () =>
            rings.map((ring) => {
                const ringBlips = blips.filter((blip) => blip.ring.id === ring.id);
                if (isSearching && ringBlips.length === 0) return null;
                return (
                    <EditableLegendRingContainer
                        key={ring.id}
                        sector={sector}
                        ring={ring}
                        blips={ringBlips}
                        isSearching={isSearching}
                    />
                );
            }),
        [rings, sector, blips, isSearching]
    );

    return (
        <div className={styles.sectorContainer}>
            <h3 style={{ color }} className={styles.sectorName}>
                {sector.name}
            </h3>
            <div className={styles.sectorContainerList}> {ringContainers}</div>
        </div>
    );
};

export default memo(EditableLegendSectorContainer);
