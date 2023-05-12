import { FC } from 'react';

import { addNewSector, closeEditSectorNameModal } from '../../../store/editRadarSlice';
import { useAppSelector } from '../../../store/hooks';
import ModalRename from './ModalEditName';

const ModalAddNewSector: FC = () => {
    const sectorNames = useAppSelector((state) => state.editRadar.sectorNames);
    return (
        <ModalRename
            open={true}
            name=""
            names={sectorNames}
            header={'Добавление сектора'}
            inputLabel={'Название сектора'}
            cancelBtnActionCreator={closeEditSectorNameModal}
            submitBtnActionCreator={addNewSector}
        ></ModalRename>
    );
};

export default ModalAddNewSector;
