import { FC, memo, useMemo } from 'react';

import { defaultColorScheme } from '../../../components/radar/styleConfig';
import { Blip } from '../../../components/radar/types';
import EditableLegendSectorContainer from './EditableLegendSectorContainer';

type Props = {
    sectorNames: string[];
    ringNames: string[];
    blips: Blip[];
    colorScheme?: string[];
    isSearching?: boolean;
};

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

    return <div>{sectorContainers}</div>;
};

export default memo(EditableLegendMain);
