import { FC } from 'react';

import { useAppSelector } from '../../store/hooks';
import EditContainer from './EditContainer';
import MainEditPanel from './editPanel/MainEditPanel';
import { useCurrentRadar } from './hooks';
import ModalEditSectorName from './modals/ModaEditSectorName';
import ModalAddNewSector from './modals/ModalAddNewSector';
import ModalCreateBlip from './modals/ModalCreateBlip';
import ModalDeleteBlip from './modals/ModalDeleteBlip';
import ModalDeleteRing from './modals/ModalDeleteRing';
import ModalDeleteSector from './modals/ModalDeleteSector';
import ModalEditBlip from './modals/ModalEditBlip';
import ModalEditRingName from './modals/ModalEditRingName';
import ModalMoveBlip from './modals/ModalMoveBlip';
import ModalSaveDialog from './modals/ModalSaveDialog';
import TableContainer from './table/TableContainer';

import styles from './constructor.module.less';

const Constructor: FC = () => {
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

    const radar = useCurrentRadar();

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
            <MainEditPanel />
            <div className={styles.main}>
                <EditContainer radar={radar} />
                <TableContainer radar={radar} />
            </div>
        </>
    );
};

export default Constructor;
