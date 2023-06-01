import { FC } from 'react';

import { getSectorNames } from '../../../components/radar/utils';
import { addNewSector, closeAddNewSectorModal } from '../../../store/editRadarSlice';
import { useAppSelector } from '../../../store/hooks';
import ModalBasic from './ModalBasic';

const defaultNewSector = { id: -1, name: '' };

const ModalAddNewSector: FC = () => {
    const sectorNames = useAppSelector((state) => getSectorNames(state.editRadar.radar));
    return (
        <ModalBasic
            open={true}
            item={defaultNewSector}
            names={sectorNames}
            header={'Добавление сектора'}
            inputLabel={'Название сектора'}
            cancelBtnActionCreator={closeAddNewSectorModal}
            submitBtnActionCreator={addNewSector}
        ></ModalBasic>
    );
};

export default ModalAddNewSector;
