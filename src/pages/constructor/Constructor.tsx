import { FC, useEffect } from 'react';

import { ConstructorMode, setEditMode } from '../../store/editRadarSlice';
import { useAppDispatch } from '../../store/hooks';
import MainContainer from './MainContainer';
import MainEditPanel from './editPanel/MainEditPanel';
import Modals from './modals/Modals';
import ModeDispatcher from './modeDispatchers/ModeDispatcher';

type Props = { mode?: ConstructorMode };

const Constructor: FC<Props> = ({ mode = ConstructorMode.NewRadarCreation }) => {
    const dispatch = useAppDispatch();

    const radar = useCurrentRadar();

    useEffect(() => {
        dispatch(setEditMode(mode));
    }, [dispatch, mode]);

    return (
        <>
            <Modals />
            <MainEditPanel />
            <MainContainer radar={radar} />
            <ModeDispatcher mode={mode} />
        </>
    );
};

export default Constructor;
