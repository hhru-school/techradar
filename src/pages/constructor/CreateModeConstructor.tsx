import { FC, useEffect } from 'react';

import { ConstructorMode, setEditMode } from '../../store/editRadarSlice';
import { useAppDispatch } from '../../store/hooks';
import MainContainer from './MainContainer';
import { useCurrentRadar } from './hooks';

const CreateModeConstructor: FC = () => {
    const radar = useCurrentRadar();

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setEditMode(ConstructorMode.NewRadarCreation));
    }, [dispatch]);

    return <MainContainer radar={radar} />;
};

export default CreateModeConstructor;
