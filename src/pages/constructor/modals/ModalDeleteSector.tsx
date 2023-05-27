import { FC } from 'react';

import { closeDeleteSectorModal, deleteSector } from '../../../store/editRadarSlice';
import { useAppSelector } from '../../../store/hooks';
import ModalDelete from './ModalDelete';

const ModalDeleteSector: FC = () => {
    const sector = useAppSelector((state) => state.editRadar.editingSector);

    if (sector) {
        const message = (
            <div>
                Действительно удалить сектор <span>{sector.name}</span>?
            </div>
        );

        return (
            <ModalDelete
                itemId={sector.id}
                closeBtnActionCreator={closeDeleteSectorModal}
                deleteBtnActionCreator={deleteSector}
                header="Удаление сектора"
                message={message}
                warningMessage="Это действие удалит все технологии принадлежащие сектору с радара!"
            />
        );
    }
    return null;
};

export default ModalDeleteSector;
