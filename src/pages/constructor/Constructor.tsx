import { FC } from 'react';

import { ConstructorMode } from '../../store/editRadarSlice';
import { useAppSelector } from '../../store/hooks';
import MainContainer from './MainContainer';
import MainEditPanel from './editPanel/mainPanel/MainEditPanel';
import Modals from './modals/Modals';
import ModeDispatcher from './modeDispatchers/ModeDispatcher';

type Props = { mode?: ConstructorMode };

const Constructor: FC<Props> = ({ mode = ConstructorMode.NewRadarCreation }) => {
    const radar = useAppSelector((state) => state.editRadar.radar);

    return (
        <>
            <Modals />
            <MainEditPanel mode={mode} />
            <MainContainer radar={radar} />
            <ModeDispatcher mode={mode} />
        </>
    );
};

export default Constructor;
