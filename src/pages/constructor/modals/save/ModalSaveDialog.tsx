import { FC, useCallback } from 'react';
import { Modal } from '@mui/material';

import { useSaveNewRadarMutation } from '../../../../api/companyRadarsApi';
import { formatCreateRadarData } from '../../../../api/radarApiUtils';
import { useAppSelector } from '../../../../store/hooks';
import { useCurrentRadar } from '../../hooks';
import SaveDialogForm from './SaveDialogForm';
import SuccessDialog from './SuccessDialog';

import styles from '../modal.module.less';

const ModalSaveDialog: FC = () => {
    const radarName = useAppSelector((state) => state.editRadar.radarName);
    const radarVersion = useAppSelector((state) => state.editRadar.radarVersion);

    const radar = useCurrentRadar();

    const [saveRadar, { data, isLoading, isSuccess }] = useSaveNewRadarMutation();

    const submitHandler = useCallback(async () => {
        await saveRadar(formatCreateRadarData({ ...radar, authorId: 1, companyId: 1, name: radarName }));
    }, [saveRadar, radar, radarName]);

    return (
        <Modal open={true}>
            <div className={styles.modal}>
                {!isSuccess && <SaveDialogForm submitHandler={submitHandler} isLoading={isLoading} />}
                {isSuccess && data && <SuccessDialog radarName={radarName} radarVersion={radarVersion} />}
            </div>
        </Modal>
    );
};

export default ModalSaveDialog;
