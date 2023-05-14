import { FC, useMemo } from 'react';

import { RadarComponentVariant } from '../../components/radar/types';
import { useAppSelector } from '../../store/hooks';
import Legend from '../techradar/components/legend/Legend';
import EditContainer from './EditContainer';
import ModalEditSectorName from './modals/ModaEditSectorName';
import ModalAddNewSector from './modals/ModalAddNewSector';
import ModalCreateBlip from './modals/ModalCreateBlip';
import ModalDeleteBlip from './modals/ModalDeleteBlip';
import ModalDeleteRing from './modals/ModalDeleteRing';
import ModalDeleteSector from './modals/ModalDeleteSector';
import ModalEditRingName from './modals/ModalEditRingName';
import ModalMoveBlip from './modals/ModalMoveBlip';

import styles from './constructor.module.less';

const Constructor: FC = () => {
    const showCreateBlipModal = useAppSelector((state) => state.editRadar.showCreateBlipModal);
    const showMoveBlipRadar = useAppSelector((state) => state.editRadar.showMoveBlipModal);
    const showEditSectorNameModal = useAppSelector((state) => state.editRadar.showEditSectorNameModal);
    const showEditRingNameModal = useAppSelector((state) => state.editRadar.showEditRingNameModal);
    const showDeleteBlipModal = useAppSelector((state) => state.editRadar.showDeleteBlipModal);
    const showDeleteSectorModal = useAppSelector((state) => state.editRadar.showDeleteSectorModal);
    const showDeleteRingModal = useAppSelector((state) => state.editRadar.showDeleteRingModal);
    const showAddNewSectorModal = useAppSelector((state) => state.editRadar.showAddNewSectorModal);

    const sectorNames = useAppSelector((state) => state.editRadar.sectorNames);
    const ringNames = useAppSelector((state) => state.editRadar.ringNames);
    const blips = useAppSelector((state) => state.editRadar.blips);

    const radar = useMemo(() => ({ sectorNames, ringNames, blips }), [sectorNames, ringNames, blips]);

    return (
        <>
            {showCreateBlipModal && <ModalCreateBlip />}
            {showMoveBlipRadar && <ModalMoveBlip />}
            {showEditSectorNameModal && <ModalEditSectorName />}
            {showEditRingNameModal && <ModalEditRingName />}
            {showDeleteBlipModal && <ModalDeleteBlip />}
            {showDeleteSectorModal && <ModalDeleteSector />}
            {showDeleteRingModal && <ModalDeleteRing />}
            {showAddNewSectorModal && <ModalAddNewSector />}
            <div className={styles.layout}>
                <EditContainer radar={radar} />
                <Legend radar={radar} variant={RadarComponentVariant.Editable} />
            </div>
        </>
    );
};

export default Constructor;
