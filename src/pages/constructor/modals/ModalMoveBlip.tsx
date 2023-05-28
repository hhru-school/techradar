import { FC, useCallback } from 'react';
import { Button, Modal } from '@mui/material';

import { ConstructorMode, closeMoveBlipModal, moveBlip } from '../../../store/editRadarSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { OperationType, useOperationHandler } from '../hooks';

import styles from './modal.module.less';

const btnSx = { width: 140 };

const ModalMoveBlip: FC = () => {
    const activeSegment = useAppSelector((state) => state.editRadar.activeSegment);
    const blip = useAppSelector((state) => state.editRadar.editingBlip);

    const mode = useAppSelector((state) => state.editRadar.mode);

    const isNewRadar = mode === ConstructorMode.NewRadarCreation;

    const dispatch = useAppDispatch();

    const [{ isLoading }, move] = useOperationHandler(OperationType.Move);

    const cancelBtnClickHandler = useCallback(() => {
        dispatch(closeMoveBlipModal());
    }, [dispatch]);

    const confirmBtnClickHandler = useCallback(async () => {
        if (!isNewRadar && blip && activeSegment) {
            await move(blip, activeSegment);
            dispatch(closeMoveBlipModal());
        } else {
            dispatch(moveBlip());
        }
    }, [dispatch, move, activeSegment, blip, isNewRadar]);

    return (
        <Modal open={true}>
            <div className={styles.modal}>
                <h3 className={styles.header}>
                    Перемещение технологии <span>{blip?.name}</span>
                </h3>
                <div className={styles.message}>
                    Действительно переместить технологию в кольцо <span>{activeSegment?.ring.name}</span> сектора{' '}
                    <span>{activeSegment?.sector.name}</span>?
                </div>
                <div className={styles.buttonContainer}>
                    <Button
                        sx={btnSx}
                        color="success"
                        variant="contained"
                        onClick={confirmBtnClickHandler}
                        type="button"
                        disabled={isLoading}
                    >
                        Принять
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

export default ModalMoveBlip;
