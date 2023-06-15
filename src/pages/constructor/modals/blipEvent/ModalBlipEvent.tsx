import { FC, useCallback } from 'react';
import { Modal } from '@mui/material';

import { closeBlipEventModal } from '../../../../store/editRadarSlice';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import CloseButton from '../CloseButton';
import ModalContent from './ModalContent';

import styles from '../modal.module.less';

const ModalBlipEvent: FC = () => {
    const editingBlipEvent = useAppSelector((state) => state.editRadar.editingBlipEvent);
    const dispatch = useAppDispatch();

    const closeHandler = useCallback(() => {
        dispatch(closeBlipEventModal());
    }, [dispatch]);

    if (!editingBlipEvent) return null;
    return (
        <Modal open={true}>
            <div className={styles.modal}>
                <CloseButton closeHandler={closeHandler} />
                <h3 className={styles.header}>
                    Событие технологии <span>{editingBlipEvent.blip?.name}</span>
                </h3>
                <ModalContent blipEvent={editingBlipEvent} />
            </div>
        </Modal>
    );
};

export default ModalBlipEvent;
