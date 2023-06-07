import { FC, memo, useMemo } from 'react';

import { defaultColorScheme } from '../../../../components/radar/styleConfig';
import { RadarInterface } from '../../../../components/radar/types';
import { getRingNames } from '../../../../components/radar/utils';
import { useAppSelector } from '../../../../store/hooks';
import LegendSearch from './LegendSearch';
import LegendSectorGroup from './LegendSectorGroup';

import styles from './legend.module.less';

type Props = { radar: RadarInterface; colorScheme?: string[] };

const suggestsHeight = 150;

const Legend: FC<Props> = ({ radar, colorScheme = defaultColorScheme }) => {
    const hoveredSectorId = useAppSelector((state) => state.displayRadar.hoveredSectorId);
    const activeSectorId = useAppSelector((state) => state.displayRadar.activeSectorId);

    const sectorGroups = useMemo(
        () =>
            radar.sectors.map((sector, i) => {
                if (activeSectorId && activeSectorId !== sector.id) return null;
                return (
                    <LegendSectorGroup
                        key={sector.id}
                        blips={radar.blips.filter((blip) => blip.sector.id === sector.id)}
                        sectorName={sector.name}
                        ringNames={getRingNames(radar)}
                        color={colorScheme[i]}
                        opacity={hoveredSectorId && hoveredSectorId !== sector.id ? 0.2 : 1}
                    />
                );
            }),
        [radar, hoveredSectorId, activeSectorId, colorScheme]
    );

    const isActiveSector = Boolean(activeSectorId);

    const legendContainerStyle = useMemo(
        () => ({ marginTop: isActiveSector ? suggestsHeight + 30 : 0 }),
        [isActiveSector]
    );

    return (
        <div>
            <LegendSearch blips={radar.blips} />
            <div className={styles.legendContainer} style={legendContainerStyle}>
                {sectorGroups}
            </div>
        </div>
    );
};

export default memo(Legend);
