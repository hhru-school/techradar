import { FC } from 'react';

import { useAppSelector } from '../../../store/hooks';
import ModalEditSector from './ModaEditSector';
import ModalAddNewBlip from './ModalAddNewBlip';
import ModalAddNewRing from './ModalAddNewRing';
import ModalAddNewSector from './ModalAddNewSector';
import ModalDeleteBlip from './ModalDeleteBlip';
import ModalDeleteBlipEvent from './ModalDeleteBlipEvent';
import ModalDeleteRing from './ModalDeleteRing';
import ModalDeleteSector from './ModalDeleteSector';
import ModalEditBlip from './ModalEditBlip';
import ModalEditRadarName from './ModalEditRadarName';
import ModalEditRing from './ModalEditRing';
import ModalEditVersionName from './ModalEditVersionName';
import ModalMoveBlip from './ModalMoveBlip';
import ModalSwitchRelease from './ModalSwitchRelease';
import ModalBlipEvent from './blipEvent/ModalBlipEvent';
import ModalSaveDialog from './save/ModalSaveDialog';

const Modals: FC = () => {
    const showCreateBlipModal = useAppSelector((state) => state.editRadar.showCreateBlipModal);
    const showEditBlipModal = useAppSelector((state) => state.editRadar.showEditBlipModal);
    const showMoveBlipRadar = useAppSelector((state) => state.editRadar.showMoveBlipModal);
    const showEditSectorNameModal = useAppSelector((state) => state.editRadar.showEditSectorModal);
    const showEditRingNameModal = useAppSelector((state) => state.editRadar.showEditRingModal);
    const showDeleteBlipModal = useAppSelector((state) => state.editRadar.showDeleteBlipModal);
    const showDeleteSectorModal = useAppSelector((state) => state.editRadar.showDeleteSectorModal);
    const showDeleteRingModal = useAppSelector((state) => state.editRadar.showDeleteRingModal);
    const showAddNewSectorModal = useAppSelector((state) => state.editRadar.showAddNewSectorModal);
    const showAddNewRingModal = useAppSelector((state) => state.editRadar.showAddNewRingModal);
    const showSaveRadarDialog = useAppSelector((state) => state.editRadar.showSaveRadarDialog);
    const showSwitchReleaseModal = useAppSelector((state) => state.editRadar.showSwitchReleaseModal);
    const showEditRadarNameModal = useAppSelector((state) => state.editRadar.showEditRadarNameModal);
    const showEditRadarVersionModal = useAppSelector((state) => state.editRadar.showEditVersionNameModal);
    const showBlipEventModal = useAppSelector((state) => state.editRadar.showBlipEventModal);
    const showDeleteBlipEventModal = useAppSelector((state) => state.editRadar.showDeleteBlipEventModal);

    return (
        <>
            {showCreateBlipModal && <ModalAddNewBlip />}
            {showEditBlipModal && <ModalEditBlip />}
            {showMoveBlipRadar && <ModalMoveBlip />}
            {showEditSectorNameModal && <ModalEditSector />}
            {showEditRingNameModal && <ModalEditRing />}
            {showDeleteBlipModal && <ModalDeleteBlip />}
            {showDeleteSectorModal && <ModalDeleteSector />}
            {showDeleteRingModal && <ModalDeleteRing />}
            {showAddNewSectorModal && <ModalAddNewSector />}
            {showAddNewRingModal && <ModalAddNewRing />}
            {showSaveRadarDialog && <ModalSaveDialog />}
            {showSwitchReleaseModal && <ModalSwitchRelease />}
            {showEditRadarNameModal && <ModalEditRadarName />}
            {showEditRadarVersionModal && <ModalEditVersionName />}
            {showBlipEventModal && <ModalBlipEvent />}
            {showDeleteBlipEventModal && <ModalDeleteBlipEvent />}
        </>
    );
};

export default Modals;
