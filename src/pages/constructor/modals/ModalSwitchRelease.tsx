import { FC, useCallback } from 'react';
import { Button, LinearProgress, Modal } from '@mui/material';

import { useUpdateVersionMutation } from '../../../api/companyRadarsApi';
import { setShowSwitchReleaseModal, setVersion } from '../../../store/editRadarSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';

import styles from './modal.module.less';

const style = { btnSx: { width: 140 } };

const ModalSwitchRelease: FC = () => {
    const dispatch = useAppDispatch();

    const version = useAppSelector((state) => state.editRadar.version);

    const [updateVersion, { isLoading }] = useUpdateVersionMutation();

    const cancelBtnClickHandler = useCallback(() => {
        dispatch(setShowSwitchReleaseModal(false));
    }, [dispatch]);

    const confirmBtnClickHandler = useCallback(async () => {
        if (version) {
            const newVersion = { ...version, release: !version.release };
            await updateVersion(newVersion);
            dispatch(setVersion(newVersion));
            dispatch(setShowSwitchReleaseModal(false));
        }
    }, [dispatch, version, updateVersion]);

    const message = version?.release ? 'Снять версию с публикации' : 'Опубликовать версию';

    return (
        <Modal open={true}>
            <div className={styles.modal}>
                <h3 className={styles.header}>Изменить статус</h3>
                <div className={styles.message}>{message}</div>

                <div className={styles.buttonContainer}>
                    <Button
                        sx={style.btnSx}
                        variant="contained"
                        onClick={confirmBtnClickHandler}
                        type="button"
                        disabled={isLoading}
                    >
                        Принять
                    </Button>
                    <Button
                        sx={style.btnSx}
                        variant="outlined"
                        onClick={cancelBtnClickHandler}
                        type="button"
                        disabled={isLoading}
                    >
                        Отмена
                    </Button>
                </div>
                {isLoading && <LinearProgress className={styles.bar} />}
            </div>
        </Modal>
    );
};

export default ModalSwitchRelease;
