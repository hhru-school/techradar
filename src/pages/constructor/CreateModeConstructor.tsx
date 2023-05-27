import { FC, useEffect } from 'react';

import { ConstructorMode, setEditMode } from '../../store/editRadarSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import MainContainer from './MainContainer';

const CreateModeConstructor: FC = () => {
    const radar = useAppSelector((state) => state.editRadar.radar);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setEditMode(ConstructorMode.NewRadarCreation));
    }, [dispatch]);

    return <MainContainer radar={radar} />;
};

export default CreateModeConstructor;
