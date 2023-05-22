import { FC, useCallback } from 'react';
import { Button, Modal } from '@mui/material';

import { closeMoveBlipModal, moveBlip } from '../../../store/editRadarSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';

import styles from './modal.module.less';

const btnSx = { width: 140 };

const ModalMoveBlip: FC = () => {
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
        <Modal open={true}>
            <div className={styles.modal}>
                <h3 className={styles.header}>
                    Перемещение технологии <span>{blip?.name}</span>
                </h3>
                <div className={styles.message}>
                    Действительно переместить технологию в кольцо <span>{activeSegment?.ringName}</span> сектора{' '}
                    <span>{activeSegment?.sectorName}</span>?
                </div>
                <div className={styles.buttonContainer}>
                    <Button
                        sx={btnSx}
                        color="success"
                        variant="contained"
                        onClick={confirmBtnClickHandler}
                        type="button"
                    >
                        Принять
                    </Button>
                    <Button sx={btnSx} variant="outlined" onClick={cancelBtnClickHandler} type="button">
                        Отмена
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default ModalMoveBlip;
