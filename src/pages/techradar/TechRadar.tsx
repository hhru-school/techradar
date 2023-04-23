import { FC } from 'react';

import Radar from '../../components/radar/Radar';
import { defaultColorScheme, defaultGap } from '../../components/radar/styleConfig';
import { generateApiData, ringNames, sectorNames } from '../../components/radar/testData';
import { formatApiData } from './api';
import TechRadarLayout from './components/TechRadarLayout';
import SectorControlPanel from './components/controls/SectorControlPanel';
import Legend from './components/legend/Legend';

const apiData = generateApiData(80);
const data = formatApiData(apiData);

const TechRadar: FC = () => {
    return (
        <>
            <SectorControlPanel sectorNames={sectorNames} colorScheme={defaultColorScheme} />
            <TechRadarLayout>
                <Radar
                    sectorNames={data.sectorNames}
                    ringNames={data.ringNames}
                    radius={300}
                    gap={defaultGap}
                    colorScheme={defaultColorScheme}
                    data={data.blips}
                />
                <Legend
                    blips={data.blips}
                    ringNames={ringNames}
                    sectorNames={sectorNames}
                    colorScheme={defaultColorScheme}
                />
            </TechRadarLayout>
        </>
    );
};

export default TechRadar;
