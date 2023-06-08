import { FC } from 'react';

import { useAppSelector } from '../../../../store/hooks';
import Legend from './Legend';

const LegendContainer: FC = () => {
    const radar = useAppSelector((state) => state.displayRadar.radar);

    if (!radar) return null;

    return <Legend radar={radar} />;
};

export default LegendContainer;
