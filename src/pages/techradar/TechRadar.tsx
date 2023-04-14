import { FC } from 'react';

import Radar from '../../components/radar/Radar';
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
            <Radar
                sectorNames={['Faa', 'Foo', 'Fee', 'Fuu', 'Goo']}
                ringNames={['Active', 'Test', 'Hold']}
                radius={200}
                gap={30}
                colorScheme={defaultColorScheme}
                data={data}
            />

            {/* <svg width={500} height={500}>
                <g transform="translate (200, 200)">
                    <RadarSegment id={''} segment={segment} color={'grey'} ringName={''} />
                    {dots}
                </g>
            </svg> */}
        </>
    );
};

export default TechRadar;
