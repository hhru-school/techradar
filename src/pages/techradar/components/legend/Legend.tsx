import { FC, memo, useEffect, useMemo, useRef } from 'react';

import { defaultColorScheme } from '../../../../components/radar/styleConfig';
import { RadarInterface } from '../../../../components/radar/types';
import { getRingNames } from '../../../../components/radar/utils';
import { setLegendBbox } from '../../../../store/activeBlipSlice';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import LegendSearch from './LegendSearch';
import LegendSectorGroup from './LegendSectorGroup';

import styles from './legend.module.less';

type Props = { radar: RadarInterface; colorScheme?: string[] };

const suggestsHeight = 150;

export interface Bbox {
    top: number;
    bottom: number;
}

const offset = 10;

const Legend: FC<Props> = ({ radar, colorScheme = defaultColorScheme }) => {
    const hoveredSectorId = useAppSelector((state) => state.displayRadar.hoveredSectorId);
    const activeSectorId = useAppSelector((state) => state.displayRadar.activeSectorId);

    const scrollOffset = useAppSelector((state) => state.activeBlip.scrollOffset);

    const dispatch = useAppDispatch();

    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (ref.current) {
            const bbox = ref.current.getBoundingClientRect();
            dispatch(setLegendBbox({ top: bbox.top, bottom: bbox.bottom }));
            ref.current.scrollBy({
                top: scrollOffset,
                behavior: 'smooth',
            });
        }
    }, [ref, dispatch, scrollOffset]);

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
        () => ({
            marginTop: isActiveSector ? suggestsHeight + offset : offset,
        }),
        [isActiveSector]
    );

    return (
        <div>
            <LegendSearch blips={radar.blips} />
            <div className={styles.legendContainer} style={legendContainerStyle} ref={ref}>
                {sectorGroups}
            </div>
        </div>
    );
};

export default memo(Legend);
