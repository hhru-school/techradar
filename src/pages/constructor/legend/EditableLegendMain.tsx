import { FC, memo, useEffect, useMemo, useRef } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { defaultColorScheme } from '../../../components/radar/styleConfig';
import { Blip, Ring, Sector } from '../../../components/radar/types';
import { setLegendBbox } from '../../../store/activeBlipSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import EditableLegendSectorContainer from './EditableLegendSectorContainer';

import styles from './legend.module.less';

type Props = {
    sectors: Sector[];
    rings: Ring[];
    blips: Blip[];
    colorScheme?: string[];
    isSearching?: boolean;
};

export interface Bbox {
    top: number;
    bottom: number;
}

const EditableLegendMain: FC<Props> = ({
    sectors,
    rings,
    blips,
    colorScheme = defaultColorScheme,
    isSearching = false,
}) => {
    const sectorContainers = useMemo(
        () =>
            sectors.map((sector, i) => {
                const sectorBlips = blips.filter((blip) => blip.sector.id === sector.id);
                if (isSearching && sectorBlips.length === 0) return null;
                return (
                    <EditableLegendSectorContainer
                        key={sector.id}
                        sector={sector}
                        rings={rings}
                        blips={sectorBlips}
                        color={colorScheme[i]}
                        isSearching={isSearching}
                    />
                );
            }),
        [rings, sectors, blips, isSearching, colorScheme]
    );

    const dispatch = useAppDispatch();

    const scrollOffset = useAppSelector((state) => state.activeBlip.scrollOffset);

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

    return (
        <DndProvider backend={HTML5Backend}>
            <div className={styles.main} ref={ref}>
                {sectorContainers}
            </div>
        </DndProvider>
    );
};

export default memo(EditableLegendMain);
