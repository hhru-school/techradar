import { FC, useCallback } from 'react';
import { Button, Modal } from '@mui/material';

import { useDeleteBlipEventMutation } from '../../../api/companyRadarsApi';
import { closeBlipEventModal, closeDeleteBlipEventModal, setCurrentBlipEventId } from '../../../store/editRadarSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';

import styles from './modal.module.less';

const style = { btnSx: { width: 140 } };

const ModalDeleteBlipEvent: FC = () => {
    const dispatch = useAppDispatch();

    const editingBlipEvent = useAppSelector((state) => state.editRadar.editingBlipEvent);
    const currentBlipEventId = useAppSelector((state) => state.editRadar.version.blipEventId);

    const [deleteBlipEvent] = useDeleteBlipEventMutation();

    const cancelBtnClickHandler = useCallback(() => {
        dispatch(closeDeleteBlipEventModal());
    }, [dispatch]);

    const confirmBtnClickHandler = useCallback(() => {
        if (!editingBlipEvent) throw new Error('No editing blipEvent assigned');
        if (currentBlipEventId === editingBlipEvent.id) {
            dispatch(setCurrentBlipEventId(-1));
        }
        deleteBlipEvent(editingBlipEvent.id)
            .unwrap()
            .then(() => {
                dispatch(closeDeleteBlipEventModal());
                dispatch(closeBlipEventModal());
            })
            .catch(() => {
                dispatch(setCurrentBlipEventId(currentBlipEventId));
                console.error('Delete blipEvent error');
            });
    }, [dispatch, editingBlipEvent, deleteBlipEvent, currentBlipEventId]);

    return (
        <Modal open={true}>
            <div className={styles.modal}>
                <h3 className={styles.header}>Удаление события</h3>
                <div className={styles.message}>Действительно удалить событие {editingBlipEvent?.blip?.name}?</div>
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
