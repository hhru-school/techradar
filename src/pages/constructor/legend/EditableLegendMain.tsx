import { FC, memo, useEffect, useMemo, useRef } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { defaultColorScheme } from '../../../components/radar/styleConfig';
import { Blip } from '../../../components/radar/types';
import { setLegendBbox } from '../../../store/activeBlipSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import EditableLegendSectorContainer from './EditableLegendSectorContainer';

import styles from './legend.module.less';

type Props = {
    sectorNames: string[];
    ringNames: string[];
    blips: Blip[];
    colorScheme?: string[];
    isSearching?: boolean;
};

export interface Bbox {
    top: number;
    bottom: number;
}

const EditableLegendMain: FC<Props> = ({
    sectorNames,
    ringNames,
    blips,
    colorScheme = defaultColorScheme,
    isSearching = false,
}) => {
    const sectorContainers = useMemo(
        () =>
            sectorNames.map((sectorName, i) => {
                const sectorBlips = blips.filter((blip) => blip.sectorName === sectorName);
                if (isSearching && sectorBlips.length === 0) return null;
                return (
                    <EditableLegendSectorContainer
                        key={sectorName}
                        sectorName={sectorName}
                        ringNames={ringNames}
                        blips={sectorBlips}
                        color={colorScheme[i]}
                        isSearching={isSearching}
                    />
                );
            }),
        [ringNames, sectorNames, blips, isSearching, colorScheme]
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
