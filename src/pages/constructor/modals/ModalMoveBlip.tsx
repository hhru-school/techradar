import { FC, useCallback, useMemo } from 'react';
import { Modal } from '@mui/material';
import { Form, Formik } from 'formik';

import { useGetLastBlipEventQuery } from '../../../api/companyRadarsApi';
import { ConstructorMode, closeMoveBlipModal, moveBlip } from '../../../store/editRadarSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { OperationType, useOperationHandler } from '../hooks';
import BlipEventInfo from './BlipEventInfo';
import ControlContainer, { Values } from './ControlContainer';
import ModalTextField from './ModalTextField';
import { nonFixedBlipWarningUpdateMessage } from './messages';

import styles from './modal.module.less';

const initialValues = { comment: '' };

const ModalMoveBlip: FC = () => {
    const activeSegment = useAppSelector((state) => state.editRadar.activeSegment);

    const blip = useAppSelector((state) => state.editRadar.editingBlip);

    const versionId = useAppSelector((state) => state.editRadar.version.id);

    const mode = useAppSelector((state) => state.editRadar.mode);

    const isNewRadar = mode === ConstructorMode.NewRadarCreation;

    const isFixed = blip?.drawInfo === 'FIXED';

    const blipId = blip?.id || -1;

    const { data: lastBlipEvent, isLoading: isBlipEventLoading } = useGetLastBlipEventQuery(
        { blipId, versionId },
        { skip: isNewRadar || isFixed }
    );

    const dispatch = useAppDispatch();

    const [{ isLoading }, move, moveEdit] = useOperationHandler(OperationType.Move);

    const cancelBtnHandler = useCallback(() => {
        dispatch(closeMoveBlipModal());
    }, [dispatch]);

    const confirmBtnHandler = useCallback(() => {
        dispatch(moveBlip());
    }, [dispatch]);

    const submitBtnHandler = useCallback(
        async (values: Values) => {
            if (blip && activeSegment) {
                if (isFixed) {
                    await move(blip, values.comment, activeSegment);
                } else {
                    if (!lastBlipEvent) throw new Error('Last blip event not provided');
                    await moveEdit({
                        comment: values.comment,
                        notFixedBlipEventId: lastBlipEvent.id,
                        distSegment: activeSegment,
                    });
                }
                dispatch(closeMoveBlipModal());
            }
        },
        [dispatch, move, activeSegment, blip, lastBlipEvent, isFixed, moveEdit]
    );

    const controls = useMemo(() => {
        if (isNewRadar) {
            return (
                <ControlContainer
                    confirmHandler={confirmBtnHandler}
                    cancelHandler={cancelBtnHandler}
                    isLoading={isLoading || isBlipEventLoading}
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
    }, [cancelBtnHandler, confirmBtnHandler, isLoading, isNewRadar, submitBtnHandler, isBlipEventLoading]);

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
                {!isNewRadar && !isFixed && (
                    <BlipEventInfo blipEvent={lastBlipEvent} message={nonFixedBlipWarningUpdateMessage} />
                )}

                {controls}
            </div>
        </Modal>
    );
};

export default ModalMoveBlip;
