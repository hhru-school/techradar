import { FC, useCallback } from 'react';
import { Modal } from '@mui/material';

import { useSaveNewRadarMutation } from '../../../../api/companyRadarsApi';
import { formatCreateRadarData } from '../../../../api/radarApiUtils';
import { useAppSelector } from '../../../../store/hooks';
import NotSuccessDialog from './NotSuccessDialog';
import SaveDialogForm from './SaveDialogForm';
import SuccessDialog from './SuccessDialog';

import styles from '../modal.module.less';

// mock
const companyId = 2;

const ModalSaveDialog: FC = () => {
    const radar = useAppSelector((state) => state.editRadar.radar);
    const versionName = useAppSelector((state) => state.editRadar.version.name);

    const [saveRadar, { data, isLoading, isSuccess, error }] = useSaveNewRadarMutation();

    const submitHandler = useCallback(async () => {
        await saveRadar(formatCreateRadarData({ ...radar, authorId: 1, companyId: 1, name: radar.name }));
    }, [saveRadar, radar]);

    return (
        <Modal open={true}>
            <div className={styles.modal}>
                {!isSuccess && <SaveDialogForm submitHandler={submitHandler} isLoading={isLoading} />}
                {isSuccess && data && (
                    <SuccessDialog
                        radarName={radar.name}
                        radarVersion={versionName}
                        radarId={data.radarId}
                        companyId={companyId}
                        versionId={data.id}
                    />
                )}
                {error && <NotSuccessDialog error={error} />}
            </div>
        </Modal>
    );
};

export default ModalSaveDialog;
