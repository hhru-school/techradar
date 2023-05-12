import { FC } from 'react';

import { closeDeleteSectorModal, deleteSector } from '../../../store/editRadarSlice';
import { useAppSelector } from '../../../store/hooks';
import ModalDelete from './ModalDelete';

const ModalDeleteSector: FC = () => {
    const currentName = useAppSelector((state) => state.editRadar.editingSectorName || '');

    const message = (
        <div>
            Действительно удалить сектор <span>{currentName}</span>?
        </div>
    );

    return (
        <ModalDelete
            itemName={currentName}
            closeBtnActionCreator={closeDeleteSectorModal}
            deleteBtnActionCreator={deleteSector}
            header="Удаление сектора"
            message={message}
            warningMessage="Это действие удалит все технологии принадлежащие сектору с радара!"
        />
    );
};

export default ModalDeleteSector;
