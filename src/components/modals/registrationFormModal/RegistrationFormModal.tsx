import { FC, useCallback, useState } from 'react';
import { Alert, Backdrop, Box, Button, Fade, Modal, Typography } from '@mui/material';
import { Formik, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';

import { ErrorResponse } from '../../../api/authApi';
import { useRegistrMutation } from '../../../api/loginApi';
import { setAuthFormOpen, setRegistrFormOpen } from '../../../store/authSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import TextInputOutlined from '../../textInputOutlined/TextInputOutlined';
import PassInput from '../components/PassInput/PassInput';

const styles = {
    boxModal: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        minWidth: 250,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    },
    btnSuccess: { marginTop: '20px' },
};

export interface RegistrationValues {
    username: string;
    password: string;
    confirmPassword: string;
}

export interface RegistrResponse {
    message: string;
}

const validSchema = Yup.object({
    username: Yup.string().required('Обязательное поле!'),
    password: Yup.string().min(3, 'Минимум 3 символа для заполнения').required('Обязательное поле!'),
    confirmPassword: Yup.string()
        .min(3, 'Минимум 3 символа для заполнения')
        .required('Обязательное поле!')
        .oneOf([Yup.ref('password')], 'Пароли должны совпадать!'),
});

const slots = { backdrop: Backdrop };
const initialValues = {
    username: '',
    password: '',
    confirmPassword: '',
};
const slotProps = {
    backdrop: {
        timeout: 500,
    },
};

const RegistrationFormModal: FC = () => {
    const dispatch = useAppDispatch();
    const showRegistrForm = useAppSelector((state) => state.auth.showRegistrForm);
    const [message, setMessage] = useState<string | null>(null);
    const [errMessage, setErrMessage] = useState<string | null>(null);
    const [registr, { isLoading }] = useRegistrMutation();

    const handleClose = useCallback(() => {
        dispatch(setRegistrFormOpen(false));
    }, [dispatch]);

    const onSubmitHandler = useCallback(
        async (values: RegistrationValues, { setSubmitting }: FormikHelpers<RegistrationValues>) => {
            await registr(values)
                .unwrap()
                .then((res: RegistrResponse) => {
                    setErrMessage(null);
                    setMessage(res.message);

                    setTimeout(() => {
                        setSubmitting(false);
                        dispatch(setRegistrFormOpen(false));
                        dispatch(setAuthFormOpen(true));
                        setMessage(null);
                        setErrMessage(null);
                    }, 3000);
                })
                .catch((err: ErrorResponse) => setErrMessage(err.data.message));
        },
        [dispatch, registr]
    );

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={showRegistrForm}
            onClose={handleClose}
            closeAfterTransition
            slots={slots}
            slotProps={slotProps}
        >
            <Fade in={showRegistrForm}>
                <Box sx={styles.boxModal}>
                    <Typography variant="h6" component="h2">
                        Регистрация учетной записи TechRadar
                    </Typography>
                    <Formik initialValues={initialValues} validationSchema={validSchema} onSubmit={onSubmitHandler}>
                        <Form className="form auth-form">
                            <TextInputOutlined
                                label="Введите email"
                                id="user"
                                name="username"
                                type="email"
                                autoComplete="on"
                                disabled={isLoading}
                            />
                            <PassInput label="Введите пароль" name="password" autoComplete="off" disabled={isLoading} />
                            <PassInput
                                label="Повторите пароль"
                                name="confirmPassword"
                                autoComplete="off"
                                disabled={isLoading}
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                color="success"
                                sx={styles.btnSuccess}
                                disabled={isLoading}
                            >
                                Зарегистрироваться
                            </Button>
                            {message && <Alert severity="success">{message}</Alert>}
                            {errMessage && <Alert severity="error">{errMessage}</Alert>}
                        </Form>
                    </Formik>
                </Box>
            </Fade>
        </Modal>
    );
};

export default RegistrationFormModal;
