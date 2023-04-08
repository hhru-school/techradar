import { FC } from 'react';

import Field from '../../components/radar/Field';

const TechRadar: FC = () => {
    return (
        <Field
            sectorNames={['foo', 'fee', 'fuu', 'dwd', 'ddas']}
            gap={10}
            ringNames={['zo', 'za', 'zu']}
            startAngle={0}
            radius={250}
        />
    );
};

export default TechRadar;
