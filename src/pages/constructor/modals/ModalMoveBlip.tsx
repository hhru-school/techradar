import { FC, useCallback } from 'react';
import { Button, Modal } from '@mui/material';

import { closeMoveBlipModal, moveBlip } from '../../../store/editRadarSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';

import styles from './modal.module.less';

type Props = {
    open: boolean;
};

const btnSx = { width: 140 };

const ModalMoveBlip: FC<Props> = ({ open }) => {
    const activeSegment = useAppSelector((state) => state.editRadar.activeSegment);
    const blip = useAppSelector((state) => state.editRadar.blip);

    const dispatch = useAppDispatch();

    const cancelBtnClickHandler = useCallback(() => {
        dispatch(closeMoveBlipModal());
    }, [dispatch]);

    const confirmBtnClickHandler = useCallback(() => {
        dispatch(moveBlip());
    }, [dispatch]);

    return (
        <Modal open={open}>
            <div className={styles.modal}>
                <h3 className={styles.header}>
                    Move technology <span>{blip?.name}</span>
                </h3>
                <div className={styles.message}>
                    Do&nbsp;you really want move technology&nbsp;to <span>{activeSegment?.ringName}</span> ring&nbsp;of{' '}
                    <span>{activeSegment?.sectorName}</span> sector?
                </div>
                <div className={styles.buttonContainer}>
                    <Button
                        sx={btnSx}
                        color="success"
                        variant="contained"
                        onClick={confirmBtnClickHandler}
                        type="button"
                    >
                        Confirm
                    </Button>
                    <Button sx={btnSx} variant="outlined" onClick={cancelBtnClickHandler} type="button">
                        Cancel
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default ModalMoveBlip;
