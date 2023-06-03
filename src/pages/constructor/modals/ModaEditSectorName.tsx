import { FC, useCallback, useMemo } from 'react';

import { useUpdateSectorMutation } from '../../../api/companyRadarsApi';
import { closeEditSectorNameModal, renameSector } from '../../../store/editRadarSlice';
import { useAppSelector } from '../../../store/hooks';
import ModalRename from './ModalRename';

const ModalEditSectorName: FC = () => {
    const editingSector = useAppSelector((state) => state.editRadar.editingSector);
    const sectors = useAppSelector((state) => state.editRadar.radar.sectors);

    const sectorNames = useMemo(() => sectors.map((sector) => sector.name), [sectors]);

    const [updateSector] = useUpdateSectorMutation();

    const submitBtnMutationHandler = useCallback(
        (value: string) => {
            if (!editingSector) throw new Error('Sector rename error');
            const position = sectors.findIndex((sector) => sector.id === editingSector.id + 1);
            return updateSector({ id: editingSector.id, name: value, position }).unwrap();
        },
        [editingSector, sectors, updateSector]
    );

    if (editingSector) {
        return (
            <ModalRename
                open={true}
                item={editingSector}
                names={sectorNames}
                header={'Переименовать кольцо'}
                inputLabel={'Название кольца'}
                closeModalActionCreator={closeEditSectorNameModal}
                submitBtnActionCreator={renameSector}
                submitBtnMutationHandler={submitBtnMutationHandler}
            ></ModalRename>
        );
    }
    return null;
};

export default ModalEditSectorName;
