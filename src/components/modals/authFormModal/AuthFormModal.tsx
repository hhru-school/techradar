import { FC, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Backdrop, Box, Button, Fade, Link, Modal, Typography } from '@mui/material';
import { Formik, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';

import { UserResponse } from '../../../api/authApi';
import { useLoginMutation } from '../../../store/authApiSlice';
import { setAuthFormOpen, setRegistrFormOpen, setCredentials } from '../../../store/authSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import TextInputOutlined from '../../textInputOutlined/TextInputOutlined';
import PassInput from '../components/PassInput/PassInput';

import './AuthFormModal.less';

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
    const refreshToken = useAppSelector((state) => state.auth.refreshToken);
    const [errorClient, setErrorClient] = useState<boolean>(false);

    const handleClose = useCallback(() => {
        dispatch(setAuthFormOpen(false));
    }, [dispatch]);

    const handleRegistr = useCallback(() => {
        dispatch(setAuthFormOpen(false));
        dispatch(setRegistrFormOpen(true));
    }, [dispatch]);

    const [login, { isLoading }] = useLoginMutation();

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
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validSchema}
                        onSubmit={async (values: Values, { setSubmitting }: FormikHelpers<Values>) => {
                            await login(values)
                                .unwrap()
                                .then((credentials: UserResponse) => {
                                    dispatch(
                                        setCredentials({
                                            username: values.username,
                                            tokenAccess: credentials.access_token,
                                            refreshToken: credentials.refresh_token,
                                        })
                                    );
                                    setTimeout(() => {
                                        dispatch(setAuthFormOpen(false));
                                        setSubmitting(false);
                                        navigate('/my-radars');
                                    }, 2000);
                                })
                                .catch(
                                    (res: {
                                        data: { message: string; status: string; timestamp: string };
                                        status: number;
                                    }) => {
                                        switch (res.status) {
                                            case 403:
                                                setErrorClient(true);
                                        }
                                    }
                                );
                        }}
                    >
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
                                sx={{ marginTop: '20px' }}
                                disabled={isLoading}
                            >
                                Войти
                            </Button>
                            {errorClient && (
                                <Alert severity="warning">
                                    Неправильный email или пароль, <br />
                                    попробуйте еще раз или зарегистрируйтесь
                                </Alert>
                            )}
                            {refreshToken && <Alert severity="success">Вы успешно авторизованы!</Alert>}
                            {/* <Alert severity="error">Ошибка сервера! Попробуйте зайти позже...</Alert> */}
                            <Link sx={{ textAlign: 'center', mt: 3, cursor: 'pointer' }} onClick={handleRegistr}>
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
