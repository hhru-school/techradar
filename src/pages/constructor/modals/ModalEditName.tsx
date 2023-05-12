import { FC } from 'react';
import { Button, Modal } from '@mui/material';
import { ActionCreatorWithPayload, ActionCreatorWithoutPayload } from '@reduxjs/toolkit';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

import { useAppDispatch } from '../../../store/hooks';
import ModalTextField from './ModalTextField';

import styles from './modal.module.less';

type Props = {
    open: boolean;
    name: string;
    names: string[];
    header: string;
    inputLabel: string;
    cancelBtnActionCreator: ActionCreatorWithoutPayload;
    submitBtnActionCreator: ActionCreatorWithPayload<string>;
};

const btnSx = { width: 140 };

const getValidationSchema = (values: string[]) =>
    Yup.object({
        name: Yup.string().trim().notOneOf(values, 'Значение уже существует').required('Обязательное поле'),
    });

const ModalEditName: FC<Props> = ({
    open,
    name,
    names,
    header,
    inputLabel,
    cancelBtnActionCreator,
    submitBtnActionCreator,
}) => {
    const dispatch = useAppDispatch();

    const cancelBtnHandler = () => {
        dispatch(cancelBtnActionCreator());
    };

    return (
        <Modal open={open}>
            <div className={styles.modal}>
                <h3 className={styles.header}>{header}</h3>
                <Formik
                    initialValues={{
                        name,
                    }}
                    validationSchema={getValidationSchema(names)}
                    onSubmit={(values, { setSubmitting }) => {
                        dispatch(submitBtnActionCreator(values.name));
                        setSubmitting(false);
                    }}
                >
                    {({ dirty, isValid }) => (
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
                                <Button sx={btnSx} variant="outlined" onClick={cancelBtnHandler}>
                                    Отмена
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </Modal>
    );
};

export default ModalEditName;
