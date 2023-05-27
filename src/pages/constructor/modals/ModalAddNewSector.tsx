import { FC } from 'react';

import { getSectorNames } from '../../../components/radar/utils';
import { addNewSector, closeEditSectorNameModal } from '../../../store/editRadarSlice';
import { useAppSelector } from '../../../store/hooks';
import ModalBasic from './ModalBasic';

const defaultNewSector = { id: -1, name: 'new-sector' };

const ModalAddNewSector: FC = () => {
    const sectorNames = useAppSelector((state) => getSectorNames(state.editRadar.radar));
    return (
        <ModalBasic
            open={true}
            item={defaultNewSector}
            names={sectorNames}
            header={'Добавление сектора'}
            inputLabel={'Название сектора'}
            cancelBtnHandler={closeEditSectorNameModal}
            submitBtnActionCreator={addNewSector}
        ></ModalBasic>
    );
};

export default ModalAddNewSector;
