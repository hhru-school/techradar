import { FC, useCallback, useMemo } from 'react';
import { Modal } from '@mui/material';
import { Form, Formik } from 'formik';

import { ConstructorMode, closeMoveBlipModal, moveBlip } from '../../../store/editRadarSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { OperationType, useOperationHandler } from '../hooks';
import ControlContainer, { Values } from './ControlContainer';
import ModalTextField from './ModalTextField';

import styles from './modal.module.less';

const initialValues = { comment: '' };

const ModalMoveBlip: FC = () => {
    const activeSegment = useAppSelector((state) => state.editRadar.activeSegment);
    const blip = useAppSelector((state) => state.editRadar.editingBlip);
    const mode = useAppSelector((state) => state.editRadar.mode);
    const isNewRadar = mode === ConstructorMode.NewRadarCreation;

    const dispatch = useAppDispatch();

    const [{ isLoading }, move] = useOperationHandler(OperationType.Move);

    const cancelBtnHandler = useCallback(() => {
        dispatch(closeMoveBlipModal());
    }, [dispatch]);

    const confirmBtnHandler = useCallback(() => {
        dispatch(moveBlip());
    }, [dispatch]);

    const submitBtnHandler = useCallback(
        async (values: Values) => {
            if (!isNewRadar && blip && values.comment && activeSegment) {
                await move(blip, values.comment, activeSegment);
                dispatch(closeMoveBlipModal());
            }
        },
        [dispatch, move, activeSegment, blip, isNewRadar]
    );

    const controls = useMemo(() => {
        if (isNewRadar) {
            return (
                <ControlContainer
                    confirmHandler={confirmBtnHandler}
                    cancelHandler={cancelBtnHandler}
                    isLoading={isLoading}
                />
            );
        }
        return (
            <Formik onSubmit={submitBtnHandler} initialValues={initialValues}>
                {() => (
                    <Form>
                        {!isNewRadar && <ModalTextField label="Комментарий" name={'comment'} multiline={true} />}

                        <ControlContainer cancelHandler={cancelBtnHandler} isLoading={isLoading} isSubmit={true} />
                    </Form>
                )}
            </Formik>
        );
    }, [cancelBtnHandler, confirmBtnHandler, isLoading, isNewRadar, submitBtnHandler]);

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
                {controls}
            </div>
        </Modal>
    );
};

export default ModalMoveBlip;
