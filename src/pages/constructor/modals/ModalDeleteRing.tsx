import { FC } from 'react';

import { closeDeleteRingModal, deleteRing } from '../../../store/editRadarSlice';
import { useAppSelector } from '../../../store/hooks';
import ModalDelete from './ModalDelete';

const ModalDeleteRing: FC = () => {
    const currentName = useAppSelector((state) => state.editRadar.editingRingName || '');

    const message = (
        <div>
            Действительно удалить кольцо <span>{currentName}</span>?
        </div>
    );

    return (
        <ModalDelete
            itemName={currentName}
            closeBtnActionCreator={closeDeleteRingModal}
            deleteBtnActionCreator={deleteRing}
            header="Delete sector"
            message={message}
        />
    );
};

export default ModalDeleteRing;