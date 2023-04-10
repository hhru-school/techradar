import { FC } from 'react';

import Radar from '../../components/radar/Radar';
import { defaultColorScheme, defaultGap } from '../../components/radar/styleConfig';
import { Blip } from '../../components/radar/types';

const data: Blip[] = [
    { ringName: 'Test', sectorName: 'Foo', id: 1, name: 'Java' },
    { ringName: 'Hold', sectorName: 'Foo', id: 2, name: 'Python' },
    { ringName: 'Hold', sectorName: 'Faa', id: 3, name: 'dwadwdw' },
    { ringName: 'Test', sectorName: 'Fee', id: 4, name: 'asdasdad' },
];

const TechRadar: FC = () => {
    return (
        <Radar
            sectorNames={['Foo', 'Faa', 'Fee']}
            gap={defaultGap}
            ringNames={['Active', 'Test', 'Hold']}
            startAngle={Math.PI / 2}
            radius={250}
            colorScheme={defaultColorScheme}
            data={data}
        />
    );
};

export default TechRadar;
