import { FC, useState, useCallback } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
    Backdrop,
    Box,
    Button,
    Fade,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    Modal,
    OutlinedInput,
    Typography,
} from '@mui/material';
import { Formik, Form, useField, FormikHelpers } from 'formik';
import * as Yup from 'yup';

import { useLoginMutation } from '../../api/authApi';
import {
    // setAuthFormData,
    setAuthFormOpen,
    setCredentials,
} from '../../store/authSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import TextInputOutlined from '../textInputOutlined/TextInputOutlined';

import './AuthFormModal.less';

export interface Values {
    user: string;
    password: string;
}

type InputProps = {
    label: string;
    name: string;
    id?: string;
    type?: string;
    autoComplete: string;
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
            {hasError ? (
                <p className="MuiFormHelperText-root MuiFormHelperText-sizeMedium MuiFormHelperText-contained error">
                    {meta.error}
                </p>
            ) : null}
        </FormControl>
    );
};

const validSchema = Yup.object({
    user: Yup.string().email('Неправильный email адрес').required('Обязательное поле!'),
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
    user: '',
    password: '',
};
const slotProps = {
    backdrop: {
        timeout: 500,
    },
};

const AuthFormModal: FC = () => {
    const dispatch = useAppDispatch();
    const showAuthForm = useAppSelector((state) => state.auth.showAuthForm);
    const [login] = useLoginMutation();

    const handleClose = useCallback(() => {
        dispatch(setAuthFormOpen(false));
    }, [dispatch]);

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
                            // dispatch(setAuthFormData(values));
                            dispatch(setAuthFormOpen(false));
                            // console.log(values);
                            const user = await login(values).unwrap();
                            dispatch(setCredentials(user));
                            setSubmitting(false);
                        }}
                    >
                        <Form className="form auth-form">
                            <TextInputOutlined label="Email" id="user" name="user" type="text" autoComplete="off" />
                            <MyPassInput label="Пароль" id="password" name="password" autoComplete="off" />
                            <Button type="submit" variant="contained" color="success" sx={{ marginTop: '20px' }}>
                                Войти
                            </Button>
                        </Form>
                    </Formik>
                </Box>
            </Fade>
        </Modal>
    );
};

export default AuthFormModal;
