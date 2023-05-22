import { FC, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Backdrop, Box, Button, Fade, Link, Modal, Typography } from '@mui/material';
import { Formik, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';

import { ErrorResponse, UserResponse } from '../../../api/authApi';
import { useLoginMutation } from '../../../api/loginApi';
import { setAuthFormOpen, setRegistrFormOpen, setCredentials } from '../../../store/authSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import TextInputOutlined from '../../textInputOutlined/TextInputOutlined';
import PassInput from '../components/PassInput/PassInput';

import './AuthFormModal.less';

const styles = {
    btnSuccess: { marginTop: '20px' },
    linkRegistr: { textAlign: 'center', mt: 3, cursor: 'pointer' },
};

export interface Values {
    username: string;
    password: string;
}

const validSchema = Yup.object({
    username: Yup.string().email('Введите валидный email').required('Обязательное поле!'),
    password: Yup.string().min(2, 'Минимум 2 символа для заполнения').required('Обязательное поле!'),
});

export const styleModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: 250,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const slots = { backdrop: Backdrop };
const initialValues = {
    username: '',
    password: '',
};
const slotProps = {
    backdrop: {
        timeout: 500,
    },
};

const AuthFormModal: FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const showAuthForm = useAppSelector((state) => state.auth.showAuthForm);
    const [message, setMessage] = useState<string | null>(null);
    const [errMessage, setErrMessage] = useState<string | null>(null);
    const [login, { isLoading }] = useLoginMutation();

    const handleClose = useCallback(() => {
        dispatch(setAuthFormOpen(false));
        setErrMessage(null);
        setMessage(null);
    }, [dispatch]);

    const handleRegistr = useCallback(() => {
        dispatch(setAuthFormOpen(false));
        dispatch(setRegistrFormOpen(true));
    }, [dispatch]);

    const onSubmitHandler = useCallback(
        async (values: Values, { setSubmitting }: FormikHelpers<Values>) => {
            await login(values)
                .unwrap()
                .then((credentials: UserResponse) => {
                    setErrMessage(null);
                    setMessage('Вы успешно авторизированы!');
                    dispatch(
                        setCredentials({
                            username: values.username,
                            tokenAccess: credentials.accessToken,
                            refreshToken: credentials.refreshToken,
                        })
                    );
                    setTimeout(() => {
                        dispatch(setAuthFormOpen(false));
                        setSubmitting(false);
                        navigate('/admin/my-radars');
                        setMessage(null);
                    }, 3000);
                })
                .catch((err: ErrorResponse) => {
                    setErrMessage(err.data.message);
                });
        },
        [dispatch, login, navigate]
    );

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={showAuthForm}
            onClose={handleClose}
            closeAfterTransition
            slots={slots}
            slotProps={slotProps}
        >
            <Fade in={showAuthForm}>
                <Box sx={styleModal}>
                    <Typography variant="h6" component="h2">
                        Вход в учетную запись TechRadar
                    </Typography>
                    <Formik initialValues={initialValues} validationSchema={validSchema} onSubmit={onSubmitHandler}>
                        <Form className="form auth-form">
                            <TextInputOutlined
                                label="Email"
                                id="user"
                                name="username"
                                type="text"
                                autoComplete="on"
                                disabled={isLoading}
                            />
                            <PassInput
                                label="Пароль"
                                id="password"
                                name="password"
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
                                Войти
                            </Button>
                            {message && <Alert severity="success">{message}</Alert>}
                            {errMessage && <Alert severity="error">{errMessage}</Alert>}
                            <Link sx={styles.linkRegistr} onClick={handleRegistr}>
                                Зарегистрироваться
                            </Link>
                        </Form>
                    </Formik>
                </Box>
            </Fade>
        </Modal>
    );
};

export default AuthFormModal;
