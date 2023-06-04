import { FC, useCallback, useMemo } from 'react';
import { Button, Modal } from '@mui/material';
import { ActionCreatorWithPayload, ActionCreatorWithoutPayload } from '@reduxjs/toolkit';
import { Form, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';

import { ConstructorMode } from '../../../store/editRadarSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import ModalTextField from './ModalTextField';

import styles from './modal.module.less';

type Props = {
    open: boolean;
    name: string;
    names: string[];
    header: string;
    inputLabel: string;
    closeModalActionCreator: ActionCreatorWithoutPayload;
    submitBtnActionCreator: ActionCreatorWithPayload<string>;
    submitBtnMutationHandler?: (value: string) => Promise<unknown>;
};

const btnSx = { width: 140 };

interface Values {
    name: string;
}

const getValidationSchema = (values: string[]) =>
    Yup.object({
        name: Yup.string().trim().notOneOf(values, 'Название уже существует').required('Обязательное поле'),
    });

const ModalBasic: FC<Props> = ({
    open,
    name,
    names,
    header,
    inputLabel,
    closeModalActionCreator,
    submitBtnActionCreator,
    submitBtnMutationHandler,
}) => {
    const mode = useAppSelector((state) => state.editRadar.mode);

    const dispatch = useAppDispatch();

    const isNewRadar = mode === ConstructorMode.NewRadarCreation;

    const initialValues = useMemo(
        () => ({
            name,
        }),
        [name]
    );

    const submitHandler = useCallback(
        (values: Values, { setSubmitting, setErrors }: FormikHelpers<Values>) => {
            if (isNewRadar) {
                dispatch(submitBtnActionCreator(values.name));
            } else if (submitBtnMutationHandler) {
                submitBtnMutationHandler(values.name)
                    .then(() => dispatch(closeModalActionCreator()))
                    .catch(() => setErrors({ name: 'Переименование не удалось' }));
            }

            setSubmitting(false);
        },
        [dispatch, submitBtnActionCreator, closeModalActionCreator, submitBtnMutationHandler, isNewRadar]
    );

    const form = useMemo(
        () =>
            ({ dirty, isValid }: { dirty: boolean; isValid: boolean }) =>
                (
                    <Form>
                        <ModalTextField label={inputLabel} name={'name'} />

                        <div className={styles.buttonContainer}>
                            <Button
                                sx={btnSx}
                                color="success"
                                variant="contained"
                                type="submit"
                                disabled={!dirty || !isValid}
                            >
                                Принять
                            </Button>
                            <Button sx={btnSx} variant="outlined" onClick={() => dispatch(closeModalActionCreator())}>
                                Отмена
                            </Button>
                        </div>
                    </Form>
                ),
        [closeModalActionCreator, inputLabel, dispatch]
    );

    return (
        <Modal open={open}>
            <>
                <div className={styles.modal}>
                    <h3 className={styles.header}>{header}</h3>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={getValidationSchema(names)}
                        onSubmit={submitHandler}
                    >
                        {form}
                    </Formik>
                </div>
            </>
        </Modal>
    );
};

export default ModalBasic;
