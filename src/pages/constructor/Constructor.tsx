import { FC, useEffect } from 'react';

import Layout from '../../components/layout/Layout';
import { ConstructorMode, setEditMode } from '../../store/editRadarSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import MainContainer from './MainContainer';
import MainEditPanel from './editPanel/mainPanel/MainEditPanel';
import Modals from './modals/Modals';
import ModeDispatcher from './modeDispatchers/ModeDispatcher';

type Props = { mode?: ConstructorMode };

const Constructor: FC<Props> = ({ mode = ConstructorMode.NewRadarCreation }) => {
    const dispatch = useAppDispatch();

    const radar = useAppSelector((state) => state.editRadar.radar);

    useEffect(() => {
        dispatch(setEditMode(mode));
    }, [dispatch, mode]);

    return (
        <Layout>
            <Modals />
            <MainEditPanel mode={mode} />
            <MainContainer radar={radar} />
            <ModeDispatcher mode={mode} />
        </Layout>
    );
};

export default Constructor;
