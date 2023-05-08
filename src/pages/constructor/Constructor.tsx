import { FC } from 'react';

import { useAppSelector } from '../../store/hooks';
import EditContainer from './EditContainer';
import ModalCreateBlip from './modals/ModalCreateBlip';

const Constructor: FC = () => {
    const showCreateBlipModal = useAppSelector((state) => state.editRadar.showCreateBlipModal);

    return (
        <>
            <ModalCreateBlip open={showCreateBlipModal} />
            <EditContainer />
        </>
    );
};

export default Constructor;
