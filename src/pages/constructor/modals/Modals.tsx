import { FC } from 'react';

import { useAppSelector } from '../../../store/hooks';
import ModalEditSectorName from './ModaEditSectorName';
import ModalAddNewSector from './ModalAddNewSector';
import ModalCreateBlip from './ModalCreateBlip';
import ModalDeleteBlip from './ModalDeleteBlip';
import ModalDeleteRing from './ModalDeleteRing';
import ModalDeleteSector from './ModalDeleteSector';
import ModalEditBlip from './ModalEditBlip';
import ModalEditRingName from './ModalEditRingName';
import ModalMoveBlip from './ModalMoveBlip';
import ModalSaveDialog from './save/ModalSaveDialog';

const Modals: FC = () => {
    const showCreateBlipModal = useAppSelector((state) => state.editRadar.showCreateBlipModal);
    const showEditBlipModal = useAppSelector((state) => state.editRadar.showEditBlipModal);
    const showMoveBlipRadar = useAppSelector((state) => state.editRadar.showMoveBlipModal);
    const showEditSectorNameModal = useAppSelector((state) => state.editRadar.showEditSectorNameModal);
    const showEditRingNameModal = useAppSelector((state) => state.editRadar.showEditRingNameModal);
    const showDeleteBlipModal = useAppSelector((state) => state.editRadar.showDeleteBlipModal);
    const showDeleteSectorModal = useAppSelector((state) => state.editRadar.showDeleteSectorModal);
    const showDeleteRingModal = useAppSelector((state) => state.editRadar.showDeleteRingModal);
    const showAddNewSectorModal = useAppSelector((state) => state.editRadar.showAddNewSectorModal);
    const showSaveRadarDialog = useAppSelector((state) => state.editRadar.showSaveRadarDialog);
    return (
        <>
            {showCreateBlipModal && <ModalCreateBlip />}
            {showEditBlipModal && <ModalEditBlip />}
            {showMoveBlipRadar && <ModalMoveBlip />}
            {showEditSectorNameModal && <ModalEditSectorName />}
            {showEditRingNameModal && <ModalEditRingName />}
            {showDeleteBlipModal && <ModalDeleteBlip />}
            {showDeleteSectorModal && <ModalDeleteSector />}
            {showDeleteRingModal && <ModalDeleteRing />}
            {showAddNewSectorModal && <ModalAddNewSector />}
            {showSaveRadarDialog && <ModalSaveDialog />}
        </>
    );
};

export default Modals;