import { FC } from 'react';

import { getRingNames } from '../../../components/radar/utils';
import { closeEditRingNameModal, renameRing } from '../../../store/editRadarSlice';
import { useAppSelector } from '../../../store/hooks';
import ModalBasic from './ModalBasic';

const ModalEditRingName: FC = () => {
    const editingRing = useAppSelector((state) => state.editRadar.editingRing);
    const ringNames = useAppSelector((state) => getRingNames(state.editRadar.radar));

    if (editingRing) {
        return (
            <ModalBasic
                open={true}
                item={editingRing}
                names={ringNames}
                header={'Изменить название кольца'}
                inputLabel={'Название кольца'}
                cancelBtnHandler={closeEditRingNameModal}
                submitBtnActionCreator={renameRing}
            ></ModalBasic>
        );
    }
    return null;
};

export default ModalEditRingName;
