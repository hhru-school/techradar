import { FC, useCallback, useMemo } from 'react';

import { useUpdateRingMutation } from '../../../api/companyRadarsApi';
import { closeEditRingModal, openDeleteRingModal, renameRing } from '../../../store/editRadarSlice';
import { useAppSelector } from '../../../store/hooks';
import ModalBasic from './ModalBasic';

const ModalEditRing: FC = () => {
    const editingRing = useAppSelector((state) => state.editRadar.editingRing);
    const rings = useAppSelector((state) => state.editRadar.radar.rings);

    const ringNames = useMemo(() => rings.map((ring) => ring.name), [rings]);

    const [updateRing] = useUpdateRingMutation();

    const submitBtnMutationHandler = useCallback(
        async (value: string) => {
            if (!editingRing) throw new Error('Ring rename error');
            await updateRing({ id: editingRing.id, name: value }).unwrap();
        },
        [editingRing, updateRing]
    );

    if (editingRing) {
        return (
            <ModalBasic
                open={true}
                name={editingRing.name}
                names={ringNames}
                header={'Редактировать кольцо'}
                inputLabel={'Название кольца'}
                closeModalActionCreator={closeEditRingModal}
                submitBtnActionCreator={renameRing}
                submitBtnMutationHandler={submitBtnMutationHandler}
                hasDeleteButton={rings.length > 1}
                deleteBtnActionCreator={openDeleteRingModal}
            ></ModalBasic>
        );
    }
    return null;
};

export default ModalEditRing;
