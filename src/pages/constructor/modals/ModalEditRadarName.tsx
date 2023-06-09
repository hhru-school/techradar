import { FC, useCallback } from 'react';

import { useUpdateRadarMutation } from '../../../api/companyRadarsApi';
import { closeEditRadarNameModal, setRadarName } from '../../../store/editRadarSlice';
import { useAppSelector } from '../../../store/hooks';
import ModalBasic from './ModalBasic';

const ModalEditRadarName: FC = () => {
    const radar = useAppSelector((state) => state.editRadar.radar);

    const [updateRadarName] = useUpdateRadarMutation();

    const submitBtnMutationHandler = useCallback(
        (value: string) => {
            return updateRadarName({ id: radar.id, name: value }).unwrap();
        },
        [radar, updateRadarName]
    );

    return (
        <ModalBasic
            open={true}
            name={radar.name}
            names={[]}
            header={'Переименовать радар'}
            inputLabel={'Название радара'}
            closeModalActionCreator={closeEditRadarNameModal}
            submitBtnActionCreator={setRadarName}
            submitBtnMutationHandler={submitBtnMutationHandler}
        ></ModalBasic>
    );
};

export default ModalEditRadarName;
