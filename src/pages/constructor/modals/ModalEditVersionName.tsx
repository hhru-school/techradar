import { FC, useCallback } from 'react';

import { useUpdateVersionMutation } from '../../../api/companyRadarsApi';
import { closeEditVersionNameModal, setVersionName } from '../../../store/editRadarSlice';
import { useAppSelector } from '../../../store/hooks';
import ModalBasic from './ModalBasic';

const ModalEditVersionName: FC = () => {
    const version = useAppSelector((state) => state.editRadar.version);

    const [updateVersionName] = useUpdateVersionMutation();

    const submitBtnMutationHandler = useCallback(
        (value: string) => {
            return updateVersionName({ id: version.id, name: value }).unwrap();
        },
        [version, updateVersionName]
    );

    return (
        <ModalBasic
            open={true}
            name={version.name}
            names={[]}
            header={'Переименовать версию'}
            inputLabel={'Имя версии'}
            closeModalActionCreator={closeEditVersionNameModal}
            submitBtnActionCreator={setVersionName}
            submitBtnMutationHandler={submitBtnMutationHandler}
        ></ModalBasic>
    );
};

export default ModalEditVersionName;
