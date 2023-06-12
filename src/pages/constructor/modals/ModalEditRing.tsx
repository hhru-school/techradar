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
        (value: string) => {
            if (!editingRing) throw new Error('Ring rename error');
            const position = rings.findIndex((ring) => ring.id === editingRing.id + 1);
            return updateRing({ id: editingRing.id, name: value, position }).unwrap();
        },
        [editingRing, rings, updateRing]
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
                hasDeleteButton={true}
                deleteBtnActionCreator={openDeleteRingModal}
            ></ModalBasic>
        );
    }
    return null;
};

export default ModalEditRing;
