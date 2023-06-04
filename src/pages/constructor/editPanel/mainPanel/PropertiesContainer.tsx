import { FC, useCallback } from 'react';

import { openEditRadarNameModal, openEditVersionNameModal } from '../../../../store/editRadarSlice';
import { useAppDispatch } from '../../../../store/hooks';
import PropertyItem from '../../components/PropertyItem';

type Props = {
    radarName: string;
    versionName: string;
};

const PropertiesContainer: FC<Props> = ({ radarName, versionName }) => {
    const dispatch = useAppDispatch();

    const editRadarNameHandler = useCallback(() => {
        dispatch(openEditRadarNameModal());
    }, [dispatch]);

    const editVersionNameHandler = useCallback(() => {
        dispatch(openEditVersionNameModal());
    }, [dispatch]);

    return (
        <>
            <PropertyItem label={'Название радара'} value={radarName} clickHandler={editRadarNameHandler} />
            <PropertyItem label={'Версия'} value={versionName} clickHandler={editVersionNameHandler} />
        </>
    );
};

export default PropertiesContainer;
