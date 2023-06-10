import { FC, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Backdrop, Box, Button, CircularProgress, Fade, Modal, SxProps, Typography } from '@mui/material';
import { Formik, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';

import { useSignInMutation } from '../../../api/loginApi';
import { ErrorResponse, SignInResponse } from '../../../api/types';
import { setAuthFormOpen, setRegistrFormOpen, setCredentials } from '../../../store/authSlice/authSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import TextInputOutlined from '../../textInputOutlined/TextInputOutlined';
import PassInput from '../components/PassInput/PassInput';

import './AuthFormModal.less';

export const styles: Record<string, SxProps> = {
    btnSuccess: { marginTop: '20px' },
    linkRegistr: { mt: 3 },
    progressCircle: { height: '100%' },
    modal: {
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
};

export interface SignInValues {
    username: string;
    password: string;
}

const validSchema = Yup.object({
    username: Yup.string().email('Введите валидный email').required('Обязательное поле!'),
    password: Yup.string().min(2, 'Минимум 2 символа для заполнения').required('Обязательное поле!'),
});

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
    const [signIn, { isLoading }] = useSignInMutation();

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
        async (values: SignInValues, { setSubmitting }: FormikHelpers<SignInValues>) => {
            await signIn(values)
                .unwrap()
                .then((credentials: SignInResponse) => {
                    setErrMessage(null);
                    setMessage('Вы успешно авторизированы!');
                    dispatch(
                        setCredentials({
                            username: values.username,
                            accessToken: credentials.accessToken,
                            refreshToken: credentials.refreshToken,
                        })
                    );
                    dispatch(setAuthFormOpen(false));
                    setSubmitting(false);
                    navigate('/admin/my-radars');
                    setMessage(null);
                })
                .catch((err: ErrorResponse) => {
                    setErrMessage(err.data.message);
                });
        },
        [dispatch, signIn, navigate]
    );

    const textSignInBtn = isLoading ? <CircularProgress color="inherit" sx={styles.progressCircle} /> : 'Войти';

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
                <Box sx={styles.modal}>
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
                                {textSignInBtn}
                            </Button>
                            {message && <Alert severity="success">{message}</Alert>}
                            {errMessage && <Alert severity="error">{errMessage}</Alert>}
                            <Button
                                disabled={isLoading}
                                variant="outlined"
                                onClick={handleRegistr}
                                sx={styles.linkRegistr}
                            >
                                Зарегистрироваться
                            </Button>
                        </Form>
                    </Formik>
                </Box>
            </Fade>
        </Modal>
    );
};

export default AuthFormModal;
