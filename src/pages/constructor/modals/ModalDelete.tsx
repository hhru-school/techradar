import { FC, ReactNode, useCallback } from 'react';
import { Alert, Button, Modal } from '@mui/material';
import { ActionCreatorWithPayload, ActionCreatorWithoutPayload } from '@reduxjs/toolkit';

import { useAppDispatch } from '../../../store/hooks';

import styles from './modal.module.less';

const btnSx = { width: 140 };

type Props = {
    itemName: string;
    closeBtnActionCreator: ActionCreatorWithoutPayload;
    deleteBtnActionCreator: ActionCreatorWithPayload<string>;
    header: string | ReactNode;
    message: string | ReactNode;
    warningMessage?: string;
};

const ModalDelete: FC<Props> = ({
    itemName,
    closeBtnActionCreator,
    deleteBtnActionCreator,
    header,
    message,
    warningMessage,
}) => {
    const dispatch = useAppDispatch();

    const cancelBtnClickHandler = useCallback(() => {
        dispatch(closeBtnActionCreator());
    }, [dispatch, closeBtnActionCreator]);

    const confirmBtnClickHandler = useCallback(() => {
        dispatch(deleteBtnActionCreator(itemName));
    }, [dispatch, deleteBtnActionCreator, itemName]);

    return (
        <Modal open={true}>
            <div className={styles.modal}>
                <h3 className={styles.header}>{header}</h3>
                <div className={styles.message}>{message}</div>
                {warningMessage && <Alert severity="error">{warningMessage}</Alert>}
                <div className={styles.buttonContainer}>
                    <Button sx={btnSx} color="error" variant="contained" onClick={confirmBtnClickHandler} type="button">
                        Удалить
                    </Button>
                    <Button sx={btnSx} variant="outlined" onClick={cancelBtnClickHandler} type="button">
                        Отмена
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default ModalDelete;
