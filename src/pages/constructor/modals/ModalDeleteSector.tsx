import { FC } from 'react';

import { closeDeleteSectorModal, deleteSector } from '../../../store/editRadarSlice';
import { useAppSelector } from '../../../store/hooks';
import ModalDelete from './ModalDelete';

const ModalDeleteSector: FC = () => {
    const currentName = useAppSelector((state) => state.editRadar.editingSectorName || '');

    const message = (
        <div>
            Are you sure you want to delete sector <span>{currentName}</span>?
        </div>
    );

    return (
        <ModalDelete
            itemName={currentName}
            closeBtnActionCreator={closeDeleteSectorModal}
            deleteBtnActionCreator={deleteSector}
            header="Delete sector"
            message={message}
            warningMessage="This action will delete all technologies which belong in this sector from current radar!"
        />
    );
};

export default ModalDeleteSector;
