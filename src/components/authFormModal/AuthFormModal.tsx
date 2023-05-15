import { FC, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
    Backdrop,
    Box,
    Button,
    Fade,
    FormControl,
    FormHelperText,
    IconButton,
    InputAdornment,
    InputLabel,
    Link,
    Modal,
    OutlinedInput,
    Typography,
} from '@mui/material';
import { Formik, Form, useField, FormikHelpers } from 'formik';
import * as Yup from 'yup';

import { UserResponse } from '../../api/authApi';
import { useLoginMutation } from '../../store/authApiSlice';
import { setAuthFormOpen, setCredentials } from '../../store/authSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import TextInputOutlined from '../textInputOutlined/TextInputOutlined';

import './AuthFormModal.less';

export interface Values {
    username: string;
    password: string;
}

type InputProps = {
    label: string;
    name: string;
    id?: string;
    type?: string;
    autoComplete: string;
    disabled?: boolean;
};

const MyPassInput = ({ label, ...props }: InputProps) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const [field, meta] = useField(props);

    const hasError = Boolean(meta.touched && meta.error);

    return (
        <FormControl variant="outlined" sx={{ marginTop: '20px' }} error={!!hasError}>
            <InputLabel htmlFor={props.id}>{label}</InputLabel>
            <OutlinedInput
                {...field}
                {...props}
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            edge="end"
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                }
                label={label}
            />
            {hasError ? <FormHelperText id="helper-text">{meta.error}</FormHelperText> : null}
        </FormControl>
    );
};

const validSchema = Yup.object({
    username: Yup.string().required('Обязательное поле!'),
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

    const handleClose = useCallback(() => {
        dispatch(setAuthFormOpen(false));
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
                    <Typography id="transition-modal-title" variant="h6" component="h2">
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
                                    dispatch(setAuthFormOpen(false));
                                    setSubmitting(false);
                                    navigate('/my-radars');
                                });
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
                            <MyPassInput
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
                            <Link sx={{ textAlign: 'center', mt: 3, cursor: 'pointer' }}>Зарегистрироваться</Link>
                        </Form>
                    </Formik>
                </Box>
            </Fade>
        </Modal>
    );
};

export default AuthFormModal;
