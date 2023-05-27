import { FC, ReactNode, useCallback } from 'react';
import { Alert, Button, Modal } from '@mui/material';
import { ActionCreatorWithPayload, ActionCreatorWithoutPayload } from '@reduxjs/toolkit';

import { useAppDispatch } from '../../../store/hooks';

import styles from './modal.module.less';

const btnSx = { width: 140 };

type Props = {
    itemId: number;
    closeBtnActionCreator: ActionCreatorWithoutPayload;
    deleteBtnActionCreator: ActionCreatorWithPayload<number>;
    header: string | ReactNode;
    message: string | ReactNode;
    warningMessage?: string;
};

const ModalDelete: FC<Props> = ({
    itemId,
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
        dispatch(deleteBtnActionCreator(itemId));
    }, [dispatch, deleteBtnActionCreator, itemId]);

    return (
        <Modal open={true}>
            <div className={styles.modal}>
                <h3 className={styles.header}>{header}</h3>
                <div className={styles.message}>{message}</div>
                {warningMessage && <Alert severity="error">{warningMessage}</Alert>}
                <div className={styles.buttonContainer}>
                    <Button sx={btnSx} color="error" variant="contained" onClick={confirmBtnClickHandler} type="button">
                        Delete
                    </Button>
                    <Button sx={btnSx} variant="outlined" onClick={cancelBtnClickHandler} type="button">
                        Cancel
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default ModalDelete;
