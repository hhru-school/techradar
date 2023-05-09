import { FC } from 'react';

import { useAppSelector } from '../../store/hooks';
import EditContainer from './EditContainer';
import ModalEditSectorName from './modals/ModaEditSectorName';
import ModalCreateBlip from './modals/ModalCreateBlip';
import ModalDeleteBlip from './modals/ModalDeleteBlip';
import ModalEditRingName from './modals/ModalEditRingName';
import ModalMoveBlip from './modals/ModalMoveBlip';

const Constructor: FC = () => {
    const showCreateBlipModal = useAppSelector((state) => state.editRadar.showCreateBlipModal);
    const showMoveBlipRadar = useAppSelector((state) => state.editRadar.showMoveBlipModal);
    const showEditSectorNameModal = useAppSelector((state) => state.editRadar.showEditSectorNameModal);
    const showEditRingNameModal = useAppSelector((state) => state.editRadar.showEditRingNameModal);
    const showDeleteBlipModal = useAppSelector((state) => state.editRadar.showDeleteBlipModal);

    return (
        <>
            {showCreateBlipModal && <ModalCreateBlip />}
            {showMoveBlipRadar && <ModalMoveBlip />}
            {showEditSectorNameModal && <ModalEditSectorName />}
            {showEditRingNameModal && <ModalEditRingName />}
            {showDeleteBlipModal && <ModalDeleteBlip />}
            <EditContainer />
        </>
    );
};

export default Constructor;
