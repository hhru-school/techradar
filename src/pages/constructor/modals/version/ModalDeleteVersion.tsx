import { FC, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Button, Modal } from '@mui/material';

import { useDeleteVersionMutation } from '../../../../api/companyRadarsApi';
import { setShowDeleteVersionModal } from '../../../../store/editRadarSlice';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import CloseButton from '../CloseButton';

import styles from '../modal.module.less';

const style = { btnSx: { width: 140 } };

const warningMessage = 'Это действие удалит все события, сделанные в текущей версии. Отменить его будет невозможно.';

const ModalDeleteVersion: FC = () => {
    const dispatch = useAppDispatch();

    const version = useAppSelector((state) => state.editRadar.version);

    const { companyId, id: radarId } = useAppSelector((state) => state.editRadar.radar);

    const [deleteVersion, { isSuccess, error }] = useDeleteVersionMutation();

    const cancelBtnClickHandler = useCallback(() => {
        dispatch(setShowDeleteVersionModal(false));
    }, [dispatch]);

    const navigate = useNavigate();

    const confirmBtnClickHandler = useCallback(() => {
        deleteVersion(version.id)
            .unwrap()

            .then(() =>
                setTimeout(() => {
                    navigate(`/admin/my-radars/company/${companyId}/grid/${radarId}`);
                }, 2000)
            )
            .catch(() => {
                console.error('Delete version error');
            });
    }, [navigate, companyId, deleteVersion, radarId, version.id]);

    if (isSuccess) {
        return (
            <Modal open={true}>
                <div className={styles.modal}>
                    <Alert severity="success">Версия успешно удалена!</Alert>
                    <div>Перенаправление в "Мои радары"....</div>
                </div>
            </Modal>
        );
    }

    if (error) {
        return (
            <Modal open={true}>
                <div className={styles.modal}>
                    <CloseButton closeHandler={cancelBtnClickHandler} />
                    <Alert severity="error">Удаление версии невозможно!</Alert>
                </div>
            </Modal>
        );
    }

    return (
        <Modal open={true}>
            <div className={styles.modal}>
                <h3 className={styles.header}>
                    Удаление версии <span>{version.name}</span>
                </h3>

                <div className={styles.message}>
                    Вы действительно хотите удалить версию <strong>{version.name}</strong>?
                </div>
                <Alert severity="error">{warningMessage}</Alert>
                <div className={styles.buttonContainer}>
                    <Button
                        sx={style.btnSx}
                        color="error"
                        variant="contained"
                        onClick={confirmBtnClickHandler}
                        type="button"
                    >
                        Удалить
                    </Button>
                    <Button sx={style.btnSx} variant="outlined" onClick={cancelBtnClickHandler} type="button">
                        Отмена
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default ModalDeleteVersion;
