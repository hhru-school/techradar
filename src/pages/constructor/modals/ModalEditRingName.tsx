import { FC } from 'react';

import { closeEditRingNameModal, renameRing } from '../../../store/editRadarSlice';
import { useAppSelector } from '../../../store/hooks';
import ModalRename from './ModalEditName';

const ModalEditRingName: FC = () => {
    const currentName = useAppSelector((state) => state.editRadar.editingRingName);
    const ringNames = useAppSelector((state) => state.editRadar.ringNames);
    return (
        <ModalRename
            open={true}
            name={currentName || ''}
            names={ringNames}
            header={'Изменить название кольца'}
            inputLabel={'Название кольца'}
            cancelBtnActionCreator={closeEditRingNameModal}
            submitBtnActionCreator={renameRing}
        ></ModalRename>
    );
};

export default ModalEditRingName;
