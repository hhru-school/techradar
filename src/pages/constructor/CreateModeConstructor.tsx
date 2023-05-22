import { FC } from 'react';

import MainContainer from './MainContainer';
import { useCurrentRadar } from './hooks';

const CreateModeConstructor: FC = () => {
    const radar = useCurrentRadar();

    return <MainContainer radar={radar} />;
};

export default CreateModeConstructor;
