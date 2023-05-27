import { FC } from 'react';

import { closeDeleteRingModal, deleteRing } from '../../../store/editRadarSlice';
import { useAppSelector } from '../../../store/hooks';
import ModalDelete from './ModalDelete';

const ModalDeleteRing: FC = () => {
    const ring = useAppSelector((state) => state.editRadar.editingRing);

    if (ring) {
        const message = (
            <div>
                Действительно удалить кольцо <span>{ring.name}</span>?
            </div>
        );

        return (
            <ModalDelete
                itemId={ring.id}
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
