import { FC } from 'react';

import { getRingNames } from '../../../components/radar/utils';
import { closeEditRingNameModal, renameRing } from '../../../store/editRadarSlice';
import { useAppSelector } from '../../../store/hooks';
import ModalRename from './ModalEditName';

const ModalEditRingName: FC = () => {
    const currentRing = useAppSelector((state) => state.editRadar.editingRing);
    const ringNames = useAppSelector((state) => getRingNames(state.editRadar.radar));

    if (currentRing) {
        return (
            <ModalRename
                open={true}
                name={currentRing.name}
                names={ringNames}
                header={'Изменить название кольца'}
                inputLabel={'Название кольца'}
                cancelBtnActionCreator={closeEditRingNameModal}
                submitBtnActionCreator={renameRing}
            ></ModalRename>
        );
    }
    return null;
};

export default ModalEditRingName;
