import { FC } from 'react';

import Radar from '../../components/radar/Radar';
import { defaultColorScheme, defaultGap } from '../../components/radar/styleConfig';
import { generateData, ringNames, sectorNames } from '../../components/radar/testData';
import { Blip } from '../../components/radar/types';

const data: Blip[] = generateData(30);

const TechRadar: FC = () => {
    return (
        <>
            <Radar
                sectorNames={sectorNames}
                ringNames={ringNames}
                radius={300}
                gap={defaultGap}
                colorScheme={defaultColorScheme}
                data={data}
            />
        </>
    );
};

export default TechRadar;
