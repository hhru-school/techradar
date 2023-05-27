import { FC } from 'react';

import { closeDeleteRingModal, deleteRing } from '../../../store/editRadarSlice';
import { useAppSelector } from '../../../store/hooks';
import ModalDelete from './ModalDelete';

const ModalDeleteRing: FC = () => {
    const editingRing = useAppSelector((state) => state.editRadar.editingRing);

    if (editingRing) {
        const message = (
            <div>
                Действительно удалить кольцо <span>{editingRing.name}</span>?
            </div>
        );

        return (
            <ModalDelete
                item={editingRing}
                closeBtnActionCreator={closeDeleteRingModal}
                deleteBtnActionCreator={deleteRing}
                header="Delete sector"
                message={message}
            />
        );
    }
    return null;
};

export default ModalDeleteRing;
