import { FC } from 'react';

import { useAppSelector } from '../../store/hooks';
import EditContainer from './EditContainer';
import EditPanel from './editPanel/EditPanel';
import ModalEditSectorName from './modals/ModaEditSectorName';
import ModalCreateBlip from './modals/ModalCreateBlip';
import ModalDeleteBlip from './modals/ModalDeleteBlip';
import ModalDeleteRing from './modals/ModalDeleteRing';
import ModalDeleteSector from './modals/ModalDeleteSector';
import ModalEditRingName from './modals/ModalEditRingName';
import ModalMoveBlip from './modals/ModalMoveBlip';

const Constructor: FC = () => {
    const showCreateBlipModal = useAppSelector((state) => state.editRadar.showCreateBlipModal);
    const showMoveBlipRadar = useAppSelector((state) => state.editRadar.showMoveBlipModal);
    const showEditSectorNameModal = useAppSelector((state) => state.editRadar.showEditSectorNameModal);
    const showEditRingNameModal = useAppSelector((state) => state.editRadar.showEditRingNameModal);
    const showDeleteBlipModal = useAppSelector((state) => state.editRadar.showDeleteBlipModal);
    const showDeleteSectorModal = useAppSelector((state) => state.editRadar.showDeleteSectorModal);
    const showDeleteRingModal = useAppSelector((state) => state.editRadar.showDeleteRingModal);

    return (
        <>
            {showCreateBlipModal && <ModalCreateBlip />}
            {showMoveBlipRadar && <ModalMoveBlip />}
            {showEditSectorNameModal && <ModalEditSectorName />}
            {showEditRingNameModal && <ModalEditRingName />}
            {showDeleteBlipModal && <ModalDeleteBlip />}
            {showDeleteSectorModal && <ModalDeleteSector />}
            {showDeleteRingModal && <ModalDeleteRing />}

            <EditPanel />
            <EditContainer />
        </>
    );
};

export default Constructor;
