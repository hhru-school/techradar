import { FC, useCallback } from 'react';
import { Button, Modal } from '@mui/material';

import { closeDeleteBlipModal, deleteBlip } from '../../../store/editRadarSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';

import styles from './modal.module.less';

const btnSx = { width: 140 };

const ModalDeleteBlip: FC = () => {
    const blip = useAppSelector((state) => state.editRadar.blip);

    const dispatch = useAppDispatch();

    const cancelBtnClickHandler = useCallback(() => {
        dispatch(closeDeleteBlipModal());
    }, [dispatch]);

    const confirmBtnClickHandler = useCallback(() => {
        dispatch(deleteBlip());
    }, [dispatch]);

    return (
        <Modal open={true}>
            <div className={styles.modal}>
                <h3 className={styles.header}>
                    Delete technology <span>{blip?.name}</span>
                </h3>
                <div className={styles.message}>Do&nbsp;you really want to delete this technology?</div>
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

export default ModalDeleteBlip;
