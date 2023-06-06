import { FC, useCallback } from 'react';
import { Button, Modal } from '@mui/material';

import { useDeleteBlipEventMutation } from '../../../api/companyRadarsApi';
import { closeDeleteBlipEventModal } from '../../../store/editRadarSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';

import styles from './modal.module.less';

const style = { btnSx: { width: 140 } };

const ModalDeleteBlipEvent: FC = () => {
    const dispatch = useAppDispatch();

    const editingBlipEventId = useAppSelector((state) => state.editRadar.editingBlipEventId);

    const [deleteBlipEvent] = useDeleteBlipEventMutation();

    const cancelBtnClickHandler = useCallback(() => {
        dispatch(closeDeleteBlipEventModal());
    }, [dispatch]);

    const confirmBtnClickHandler = useCallback(() => {
        deleteBlipEvent(editingBlipEventId)
            .unwrap()
            .then(() => {
                dispatch(closeDeleteBlipEventModal());
            })
            .catch(() => console.error('Delete blipEvent error'));
    }, [dispatch, editingBlipEventId, deleteBlipEvent]);

    return (
        <Modal open={true}>
            <div className={styles.modal}>
                <h3 className={styles.header}>Удаление события</h3>
                <div className={styles.message}>Действительно удалить событие {editingBlipEventId}?</div>
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

export default ModalDeleteBlipEvent;
