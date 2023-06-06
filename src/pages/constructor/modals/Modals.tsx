import { FC } from 'react';

import { useAppSelector } from '../../../store/hooks';
import ModalEditSectorName from './ModaEditSectorName';
import ModalAddNewBlip from './ModalAddNewBlip';
import ModalAddNewSector from './ModalAddNewSector';
import ModalDeleteBlip from './ModalDeleteBlip';
import ModalDeleteBlipEvent from './ModalDeleteBlipEvent';
import ModalDeleteRing from './ModalDeleteRing';
import ModalDeleteSector from './ModalDeleteSector';
import ModalEditBlip from './ModalEditBlip';
import ModalEditRadarName from './ModalEditRadarName';
import ModalEditRingName from './ModalEditRingName';
import ModalEditVersionName from './ModalEditVersionName';
import ModalMoveBlip from './ModalMoveBlip';
import ModalSwitchRelease from './ModalSwitchRelease';
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
    const showSwitchReleaseModal = useAppSelector((state) => state.editRadar.showSwitchReleaseModal);
    const showEditRadarNameModal = useAppSelector((state) => state.editRadar.showEditRadarNameModal);
    const showEditRadarVersionModal = useAppSelector((state) => state.editRadar.showEditVersionNameModal);
    const showDeleteBlipEventModal = useAppSelector((state) => state.editRadar.showDeleteBlipEventModal);

    return (
        <>
            {showCreateBlipModal && <ModalAddNewBlip />}
            {showEditBlipModal && <ModalEditBlip />}
            {showMoveBlipRadar && <ModalMoveBlip />}
            {showEditSectorNameModal && <ModalEditSectorName />}
            {showEditRingNameModal && <ModalEditRingName />}
            {showDeleteBlipModal && <ModalDeleteBlip />}
            {showDeleteSectorModal && <ModalDeleteSector />}
            {showDeleteRingModal && <ModalDeleteRing />}
            {showAddNewSectorModal && <ModalAddNewSector />}
            {showSaveRadarDialog && <ModalSaveDialog />}
            {showSwitchReleaseModal && <ModalSwitchRelease />}
            {showEditRadarNameModal && <ModalEditRadarName />}
            {showEditRadarVersionModal && <ModalEditVersionName />}
            {showDeleteBlipEventModal && <ModalDeleteBlipEvent />}
        </>
    );
};

export default Modals;
