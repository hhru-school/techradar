import { FC, useCallback } from 'react';
import { Alert, Button, Modal } from '@mui/material';

import { setShowDeleteVersionModal } from '../../../../store/editRadarSlice';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';

import styles from '../modal.module.less';

const style = { btnSx: { width: 140 } };

const warningMessage = 'Это действие удалит все события, сделанные в текущей версии. Отменить его будет невозможно.';

const ModalDeleteVersion: FC = () => {
    const dispatch = useAppDispatch();

    const version = useAppSelector((state) => state.editRadar.version);

    const cancelBtnClickHandler = useCallback(() => {
        dispatch(setShowDeleteVersionModal(false));
    }, [dispatch]);

    const confirmBtnClickHandler = useCallback(() => {
        dispatch(setShowDeleteVersionModal(false));
    }, [dispatch]);

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
