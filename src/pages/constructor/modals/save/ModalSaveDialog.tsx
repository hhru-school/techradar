import { FC, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Modal } from '@mui/material';

import { useSaveNewRadarMutation } from '../../../../api/companyRadarsApi';
import { formatCreateRadarData } from '../../../../api/radarApiUtils';
import { useAppSelector } from '../../../../store/hooks';
import NotSuccessDialog from './NotSuccessDialog';
import SaveDialogForm from './SaveDialogForm';
import SuccessDialog from './SuccessDialog';

import styles from '../modal.module.less';

const ModalSaveDialog: FC = () => {
    const radar = useAppSelector((state) => state.editRadar.radar);
    const versionName = useAppSelector((state) => state.editRadar.version.name);

    const { companyId: companyIdSlug } = useParams();

    const companyId = Number(companyIdSlug);

    const [saveRadar, { data, isLoading, isSuccess, error }] = useSaveNewRadarMutation();

    const submitHandler = useCallback(async () => {
        await saveRadar(formatCreateRadarData({ ...radar, authorId: 1, companyId, name: radar.name }));
    }, [saveRadar, radar, companyId]);

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
