import { FC } from 'react';

import { useAppSelector } from '../../store/hooks';
import EditContainer from './EditContainer';
import ModalCreateBlip from './modals/ModalCreateBlip';
import ModalMoveBlip from './modals/ModalMoveBlip';

const Constructor: FC = () => {
    const showCreateBlipModal = useAppSelector((state) => state.editRadar.showCreateBlipModal);
    const showMoveBlipRadar = useAppSelector((state) => state.editRadar.showMoveBlipModal);

    return (
        <>
            {showCreateBlipModal && <ModalCreateBlip open={true} />}
            {showMoveBlipRadar && <ModalMoveBlip open={true} />}
            <EditContainer />
        </>
    );
};

export default Constructor;
