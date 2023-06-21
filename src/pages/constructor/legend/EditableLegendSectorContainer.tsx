import { FC, memo, useMemo } from 'react';

import { defaultColorScheme } from '../../../components/radar/styleConfig';
import { Blip, Ring, Sector } from '../../../components/radar/types';
import EditableLegendRingContainer from './EditableLegendRingContainer';

import styles from './legend.module.less';

type Props = {
    sector: Sector;
    rings: Ring[];
    blips: Blip[];
    colorScheme?: string[];
    isSearching?: boolean;
};

const EditableLegendSectorContainer: FC<Props> = ({
    sector,
    rings,
    blips,
    colorScheme = defaultColorScheme,
    isSearching = false,
}) => {
    const ringContainers = useMemo(
        () =>
            rings.map((ring, i) => {
                const ringBlips = blips.filter((blip) => blip.ring.id === ring.id);
                if (isSearching && ringBlips.length === 0) return null;
                return (
                    <EditableLegendRingContainer
                        key={ring.id}
                        sector={sector}
                        ring={ring}
                        blips={ringBlips}
                        isSearching={isSearching}
                        color={colorScheme[i]}
                    />
                );
            }),
        [rings, sector, blips, isSearching, colorScheme]
    );

    return (
        <div className={styles.sectorContainer}>
            <h3 className={styles.sectorName}>{sector.name}</h3>
            <div className={styles.sectorContainerList}> {ringContainers}</div>
        </div>
    );
};

export default memo(EditableLegendSectorContainer);
