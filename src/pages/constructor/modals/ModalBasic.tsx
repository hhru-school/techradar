import { FC, useCallback, useMemo } from 'react';
import { Delete } from '@mui/icons-material';
import { Button, IconButton, Modal } from '@mui/material';
import { ActionCreatorWithPayload, ActionCreatorWithoutPayload } from '@reduxjs/toolkit';
import { Form, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';

import { isErrorWithType } from '../../../api/helpers';
import { ErrorType } from '../../../api/types';
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
    confirmBtnLabel?: string;
    cancelBtnLabel?: string;
    hasDeleteButton?: boolean;
    deleteBtnActionCreator?: ActionCreatorWithoutPayload;
};

const btnSx = { width: 140 };

interface Values {
    name: string;
}

const getErrorMessage = (error: unknown): string => {
    if (isErrorWithType(error)) {
        if (error.data.type === ErrorType.EntityExists) return 'Название уже существует!';
        return error.data.message;
    }
    return 'Неизвестная ошибка. Сохранение не удалось!..';
};

const valuesToLowerCase = (values: string[]): string[] => values.map((value) => value.toLocaleLowerCase());

const getValidationSchema = (values: string[]) =>
    Yup.object({
        name: Yup.string()
            .trim()
            .lowercase()
            .notOneOf(valuesToLowerCase(values), 'Название уже существует')
            .required('Обязательное поле'),
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
    confirmBtnLabel = 'Сохранить',
    cancelBtnLabel = 'Отмена',
    hasDeleteButton = false,
    deleteBtnActionCreator,
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
            const value = values.name.trim();
            if (isNewRadar) {
                dispatch(submitBtnActionCreator(value));
            } else if (submitBtnMutationHandler) {
                submitBtnMutationHandler(value)
                    .then(() => {
                        dispatch(closeModalActionCreator());
                    })
                    .catch((error) => {
                        setErrors({ name: getErrorMessage(error) });
                    });
            }

            setSubmitting(false);
        },
        [dispatch, submitBtnActionCreator, closeModalActionCreator, submitBtnMutationHandler, isNewRadar]
    );

    const deleteHandler = useCallback(() => {
        if (!deleteBtnActionCreator) throw new Error('Delete action creator not assigned!');
        dispatch(deleteBtnActionCreator());
    }, [dispatch, deleteBtnActionCreator]);

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
                                {confirmBtnLabel}
                            </Button>
                            <Button sx={btnSx} variant="outlined" onClick={() => dispatch(closeModalActionCreator())}>
                                {cancelBtnLabel}
                            </Button>
                        </div>
                    </Form>
                ),
        [closeModalActionCreator, inputLabel, cancelBtnLabel, confirmBtnLabel, dispatch]
    );

    return (
        <Modal open={open}>
            <>
                <div className={styles.modal}>
                    <div className={styles.headerContainer}>
                        <h3 className={styles.header}>{header}</h3>
                        {hasDeleteButton && isNewRadar && (
                            <IconButton onClick={deleteHandler}>
                                <Delete />
                            </IconButton>
                        )}
                    </div>
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
