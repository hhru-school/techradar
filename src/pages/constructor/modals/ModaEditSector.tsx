import { FC, useCallback, useMemo } from 'react';

import { useUpdateSectorMutation } from '../../../api/companyRadarsApi';
import { closeEditSectorModal, openDeleteSectorModal, renameSector } from '../../../store/editRadarSlice';
import { useAppSelector } from '../../../store/hooks';
import ModalBasic from './ModalBasic';

const ModalEditSector: FC = () => {
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
            <ModalBasic
                open={true}
                name={editingSector.name}
                names={sectorNames}
                header={'Редактировать сектор'}
                inputLabel={'Название сектора'}
                closeModalActionCreator={closeEditSectorModal}
                submitBtnActionCreator={renameSector}
                submitBtnMutationHandler={submitBtnMutationHandler}
                hasDeleteButton={sectors.length > 1}
                deleteBtnActionCreator={openDeleteSectorModal}
            />
        );
    }
    return null;
};

export default ModalEditSector;
