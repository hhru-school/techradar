import { FC, memo, useMemo } from 'react';

import { FormattedRadarData } from '../../../../api/radarApiUtils';
import { defaultColorScheme } from '../../../../components/radar/styleConfig';
import { RadarComponentVariant } from '../../../../components/radar/types';
import { useAppSelector } from '../../../../store/hooks';
import LegendSearch from './LegendSearch';
import LegendSectorGroup from './LegendSectorGroup';

import styles from './legend.module.less';

type Props = { radar: FormattedRadarData; colorScheme?: string[]; variant?: RadarComponentVariant };

const suggestsHeight = 150;

const Legend: FC<Props> = ({
    radar,
    colorScheme = defaultColorScheme,
    variant = RadarComponentVariant.Demonstrative,
}) => {
    const hoveredSector = useAppSelector((state) => state.activeSector.hoveredSectorName);
    const activeSector = useAppSelector((state) => state.activeSector.activeSectorName);

    const sectorGroups = useMemo(
        () =>
            radar.sectorNames.map((sectorName, i) => {
                if (activeSector && activeSector !== sectorName) return null;
                return (
                    <LegendSectorGroup
                        key={sectorName}
                        blips={radar.blips.filter((blip) => blip.sectorName === sectorName)}
                        sectorName={sectorName}
                        ringNames={radar.ringNames}
                        color={colorScheme[i]}
                        opacity={hoveredSector && hoveredSector !== sectorName ? 0.2 : 1}
                        variant={variant}
                    />
                );
            }),
        [radar, hoveredSector, activeSector, colorScheme, variant]
    );

    const isActiveSector = Boolean(activeSector);

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
