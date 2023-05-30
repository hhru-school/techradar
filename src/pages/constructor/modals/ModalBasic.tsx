import { FC, useCallback, useMemo } from 'react';
import { Button, Modal } from '@mui/material';
import { ActionCreatorWithPayload, ActionCreatorWithoutPayload } from '@reduxjs/toolkit';
import { Form, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';

import { Ring, Sector } from '../../../components/radar/types';
import { useAppDispatch } from '../../../store/hooks';
import ModalTextField from './ModalTextField';

import styles from './modal.module.less';

type Props = {
    open: boolean;
    item: Sector | Ring;
    names: string[];
    header: string;
    inputLabel: string;
    cancelBtnActionCreator: ActionCreatorWithoutPayload;
    submitBtnActionCreator: ActionCreatorWithPayload<Sector | Ring>;
};

const btnSx = { width: 140 };

interface Values {
    name: string;
}

const getValidationSchema = (values: string[]) =>
    Yup.object({
        name: Yup.string().trim().notOneOf(values, 'Значение уже существует').required('Обязательное поле'),
    });

const ModalBasic: FC<Props> = ({
    open,
    item,
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

    const initialValues = useMemo(
        () => ({
            name: item.name,
        }),
        [item]
    );

    const submitHandler = useCallback(
        (values: Values, { setSubmitting }: FormikHelpers<Values>) => {
            dispatch(submitBtnActionCreator({ id: item.id, name: values.name }));
            setSubmitting(false);
        },
        [dispatch, item, submitBtnActionCreator]
    );

    return (
        <Modal open={open}>
            <div className={styles.modal}>
                <h3 className={styles.header}>{header}</h3>
                <Formik
                    initialValues={initialValues}
                    validationSchema={getValidationSchema(names)}
                    onSubmit={submitHandler}
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

export default ModalBasic;
