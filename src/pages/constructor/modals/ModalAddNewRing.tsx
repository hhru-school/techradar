import { FC } from 'react';

import { getRingNames } from '../../../components/radar/utils';
import { addNewRing, closeAddNewRingModal } from '../../../store/editRadarSlice';
import { useAppSelector } from '../../../store/hooks';
import ModalBasic from './ModalBasic';

const ModalAddNewRing: FC = () => {
    const ringNames = useAppSelector((state) => getRingNames(state.editRadar.radar));
    return (
        <ModalBasic
            open={true}
            name={''}
            names={ringNames}
            header={'Добавить кольцо'}
            inputLabel={'Название кольца'}
            closeModalActionCreator={closeAddNewRingModal}
            submitBtnActionCreator={addNewRing}
        ></ModalBasic>
    );
};

export default ModalAddNewRing;
