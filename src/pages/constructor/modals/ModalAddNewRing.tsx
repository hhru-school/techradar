import { FC } from 'react';

import { getSectorNames } from '../../../components/radar/utils';
import { addNewRing, closeAddNewRingModal } from '../../../store/editRadarSlice';
import { useAppSelector } from '../../../store/hooks';
import ModalBasic from './ModalBasic';

const ModalAddNewRing: FC = () => {
    const sectorNames = useAppSelector((state) => getSectorNames(state.editRadar.radar));
    return (
        <ModalBasic
            open={true}
            name={''}
            names={sectorNames}
            header={'Добавить кольцо'}
            inputLabel={'Название кольца'}
            closeModalActionCreator={closeAddNewRingModal}
            submitBtnActionCreator={addNewRing}
        ></ModalBasic>
    );
};

export default ModalAddNewRing;
