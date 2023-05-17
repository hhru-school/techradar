import { FC, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Backdrop, Box, Button, Fade, Modal, Typography } from '@mui/material';
import { Formik, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';

import { UserResponse } from '../../../api/authApi';
import { useRegistrMutation } from '../../../store/authApiSlice';
import { setAuthFormOpen, setCredentials, setRegistrFormOpen } from '../../../store/authSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import TextInputOutlined from '../../textInputOutlined/TextInputOutlined';
import PassInput from '../components/PassInput/PassInput';

export interface Values {
    username: string;
    password: string;
}

const validSchema = Yup.object({
    username: Yup.string().required('Обязательное поле!'),
    password: Yup.string().min(3, 'Минимум 3 символа для заполнения').required('Обязательное поле!'),
    confirm: Yup.string()
        .min(3, 'Минимум 3 символа для заполнения')
        .required('Обязательное поле!')
        .oneOf([Yup.ref('password')], 'Пароли должны совпадать!'),
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

const RegistrationFormModal: FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const showRegistrForm = useAppSelector((state) => state.auth.showRegistrForm);

    const handleClose = useCallback(() => {
        dispatch(setRegistrFormOpen(false));
    }, [dispatch]);

    const [registr, { isLoading }] = useRegistrMutation();

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
                <Box sx={styleModal}>
                    <Typography variant="h6" component="h2">
                        Регистрация учетной записи TechRadar
                    </Typography>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validSchema}
                        onSubmit={async (values: Values, { setSubmitting }: FormikHelpers<Values>) => {
                            await registr(values)
                                .unwrap()
                                .then((credentials: UserResponse) => {
                                    dispatch(
                                        setCredentials({
                                            username: values.username,
                                            tokenAccess: credentials.access_token,
                                            refreshToken: credentials.refresh_token,
                                        })
                                    );
                                    dispatch(setAuthFormOpen(false));
                                    setSubmitting(false);
                                    navigate('/my-radars');
                                });
                        }}
                    >
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
                                name="confirm"
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
                                Зарегистрироваться
                            </Button>
                            <Alert severity="success">Вы успешно зарегистрированы!</Alert>
                            <Alert severity="error">Ошибка! Попробуйте зайти позже...</Alert>
                        </Form>
                    </Formik>
                </Box>
            </Fade>
        </Modal>
    );
};

export default RegistrationFormModal;
