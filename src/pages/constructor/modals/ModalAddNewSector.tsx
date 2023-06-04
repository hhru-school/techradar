import { FC } from 'react';

import { getSectorNames } from '../../../components/radar/utils';
import { addNewSector, closeAddNewSectorModal } from '../../../store/editRadarSlice';
import { useAppSelector } from '../../../store/hooks';
import ModalRename from './ModalBasic';

const ModalAddNewSector: FC = () => {
    const sectorNames = useAppSelector((state) => getSectorNames(state.editRadar.radar));
    return (
        <ModalRename
            open={true}
            name={''}
            names={sectorNames}
            header={'Добавление сектора'}
            inputLabel={'Название сектора'}
            closeModalActionCreator={closeAddNewSectorModal}
            submitBtnActionCreator={addNewSector}
        ></ModalRename>
    );
};

export default ModalAddNewSector;
