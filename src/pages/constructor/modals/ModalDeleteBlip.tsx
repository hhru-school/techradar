import { FC, useCallback } from 'react';
import { Button, Modal } from '@mui/material';

import { ConstructorMode, closeDeleteBlipModal, deleteBlip } from '../../../store/editRadarSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { OperationType, useOperationHandler } from '../hooks';

import styles from './modal.module.less';

const btnSx = { width: 140 };

const ModalDeleteBlip: FC = () => {
    const blip = useAppSelector((state) => state.editRadar.editingBlip);

    const mode = useAppSelector((state) => state.editRadar.mode);

    const isNewRadar = mode === ConstructorMode.NewRadarCreation;

    const dispatch = useAppDispatch();

    const [{ isLoading }, deleteBlipHandler] = useOperationHandler(OperationType.Delete);

    const cancelBtnClickHandler = useCallback(() => {
        dispatch(closeDeleteBlipModal());
    }, [dispatch]);

    const confirmBtnClickHandler = useCallback(async () => {
        if (!isNewRadar && blip) {
            await deleteBlipHandler(blip);
            dispatch(closeDeleteBlipModal());
        } else {
            dispatch(deleteBlip());
        }
    }, [dispatch, blip, deleteBlipHandler, isNewRadar]);

    return (
        <Modal open={true}>
            <div className={styles.modal}>
                <h3 className={styles.header}>
                    Удаление технологии <span>{blip?.name}</span>
                </h3>
                <div className={styles.message}>Вы&nbsp;действительно хотите удалить технологию?</div>
                <div className={styles.buttonContainer}>
                    <Button
                        sx={btnSx}
                        color="error"
                        variant="contained"
                        onClick={confirmBtnClickHandler}
                        type="button"
                        disabled={isLoading}
                    >
                        Удалить
                    </Button>
                    <Button
                        sx={btnSx}
                        variant="outlined"
                        onClick={cancelBtnClickHandler}
                        type="button"
                        disabled={isLoading}
                    >
                        Отмена
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default ModalDeleteBlip;
