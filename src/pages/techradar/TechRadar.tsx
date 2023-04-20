import { FC } from 'react';

import Radar from '../../components/radar/Radar';
import { defaultColorScheme, defaultGap } from '../../components/radar/styleConfig';
import { generateData, ringNames, sectorNames } from '../../components/radar/testData';
import { Blip } from '../../components/radar/types';
import TechRadarLayout from './components/TechRadarLayout';
import SectorControlPanel from './components/controls/SectorControlPanel';
import Legend from './components/legend/Legend';

const data: Blip[] = generateData(30).sort((blipA, blipB) => blipA.id - blipB.id);

const TechRadar: FC = () => {
    return (
        <>
            <SectorControlPanel sectorNames={sectorNames} colorScheme={defaultColorScheme} />
            <TechRadarLayout>
                <Radar
                    sectorNames={sectorNames}
                    ringNames={ringNames}
                    radius={300}
                    gap={defaultGap}
                    colorScheme={defaultColorScheme}
                    data={data}
                />
                <Legend blips={data} ringNames={ringNames} sectorNames={sectorNames} colorScheme={defaultColorScheme} />
            </TechRadarLayout>
        </>
    );
};

export default TechRadar;
