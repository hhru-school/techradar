import { FC, useCallback, useMemo } from 'react';
import { Modal } from '@mui/material';
import { Form, Formik } from 'formik';

import { ConstructorMode, closeDeleteBlipModal, deleteBlip } from '../../../store/editRadarSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { OperationType, useOperationHandler } from '../hooks';
import ControlContainer, { Values } from './ControlContainer';
import ModalTextField from './ModalTextField';

import styles from './modal.module.less';

const initialValues = { comment: '' };

const ModalDeleteBlip: FC = () => {
    const blip = useAppSelector((state) => state.editRadar.editingBlip);

    const mode = useAppSelector((state) => state.editRadar.mode);

    const isNewRadar = mode === ConstructorMode.NewRadarCreation;

    const dispatch = useAppDispatch();

    const [{ isLoading }, deleteBlipHandler, deleteEditHandler] = useOperationHandler(OperationType.Delete);

    const isFixed = blip?.drawInfo === 'FIXED';

    const cancelBtnHandler = useCallback(() => {
        dispatch(closeDeleteBlipModal());
    }, [dispatch]);

    const confirmBtnHandler = useCallback(() => {
        dispatch(deleteBlip());
    }, [dispatch]);

    const submitBtnHandler = useCallback(
        async (values: Values) => {
            if (!isNewRadar && blip) {
                if (isFixed) {
                    await deleteBlipHandler(blip, values.comment);
                } else {
                    await deleteEditHandler({ blip, comment: values.comment });
                }

                dispatch(closeDeleteBlipModal());
            }
        },
        [dispatch, deleteBlipHandler, blip, isNewRadar, deleteEditHandler, isFixed]
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
                    Удаление технологии <span>{blip?.name}</span>
                </h3>
                <div className={styles.message}>Вы&nbsp;действительно хотите удалить технологию?</div>
                {controls}
            </div>
        </Modal>
    );
};

export default ModalDeleteBlip;
