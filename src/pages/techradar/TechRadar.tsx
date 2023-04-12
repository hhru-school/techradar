import { FC } from 'react';

import RadarField from '../../components/radar/RadarField';
import { defaultColorScheme } from '../../components/radar/styleConfig';
import { Blip } from '../../components/radar/types';

const data: Blip[] = [
    { ringName: 'Test', sectorName: 'Foo', id: 1, name: 'Java' },
    { ringName: 'Hold', sectorName: 'Foo', id: 2, name: 'Python' },
    { ringName: 'Hold', sectorName: 'Faa', id: 3, name: 'dwadwdw' },
    { ringName: 'Test', sectorName: 'Fee', id: 4, name: 'asdasdad' },
    { ringName: 'Active', sectorName: 'Faa', id: 4, name: 'asdasdad' },
    { ringName: 'Active', sectorName: 'Faa', id: 4, name: 'asdasdad' },
    { ringName: 'Active', sectorName: 'Faa', id: 4, name: 'asdasdad' },
    { ringName: 'Active', sectorName: 'Faa', id: 4, name: 'asdasdad' },
];

const TechRadar: FC = () => {
    return (
        <>
            <RadarField
                sectorNames={['Faa', 'Foo', 'Fee']}
                ringNames={['Active', 'Test', 'Hold']}
                radius={200}
                gap={0}
                colorScheme={defaultColorScheme}
                data={data}
            />
            {/* <TestArc segment={segment} /> */}
        </>
    );
};

export default TechRadar;
