import { FC, useCallback, useMemo } from 'react';

import { useUpdateRingMutation } from '../../../api/companyRadarsApi';
import { closeEditRingNameModal, renameRing } from '../../../store/editRadarSlice';
import { useAppSelector } from '../../../store/hooks';
import ModalBasic from './ModalBasic';

const ModalEditRingName: FC = () => {
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
                header={'Изменить название кольца'}
                inputLabel={'Название кольца'}
                closeModalActionCreator={closeEditRingNameModal}
                submitBtnActionCreator={renameRing}
                submitBtnMutationHandler={submitBtnMutationHandler}
            ></ModalBasic>
        );
    }
    return null;
};

export default ModalEditRingName;
