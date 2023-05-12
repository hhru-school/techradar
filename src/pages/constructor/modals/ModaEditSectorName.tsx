import { FC } from 'react';

import { closeEditSectorNameModal, renameSector } from '../../../store/editRadarSlice';
import { useAppSelector } from '../../../store/hooks';
import ModalRename from './ModalEditName';

const ModalEditSectorName: FC = () => {
    const currentName = useAppSelector((state) => state.editRadar.editingSectorName);
    const sectorNames = useAppSelector((state) => state.editRadar.sectorNames);
    return (
        <ModalRename
            open={true}
            name={currentName || ''}
            names={sectorNames}
            header={'Edit sector name'}
            inputLabel={'Sector name'}
            cancelBtnActionCreator={closeEditSectorNameModal}
            submitBtnActionCreator={renameSector}
        ></ModalRename>
    );
};

export default ModalEditSectorName;
