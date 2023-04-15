import { FC, useState, MouseEvent } from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
    TextField,
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

import { setAuthFormOpen, setAuthFormData } from '../../store/dataSlice';
import { useAppDispatch, useAppSelector } from '../../store/store';

export interface Values {
    email: string;
    password: string;
}

type InputProps = {
    label: string;
    name: string;
    id?: string;
    type: string;
    autoComplete: string;
};

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const AuthFormModal: FC = () => {
    const dispatch = useAppDispatch();
    const authentificationFormOpen = useAppSelector((state) => state.data.authentificationFormOpen);

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => event.preventDefault();

    const MyTextInput = ({ label, ...props }: InputProps) => {
        const [field, meta] = useField(props);
        return (
            <TextField
                id="outlined-basic"
                label={label}
                variant="outlined"
                {...field}
                {...props}
                helperText={meta.error}
                style={{ marginTop: 20 }}
            />
        );
    };

    const MyPassInput = ({ label, ...props }: InputProps) => {
        const [field, meta] = useField(props);
        return (
            <FormControl variant="outlined" style={{ marginTop: 20 }} error={!!(meta.touched && meta.error)}>
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
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                    label={label}
                />
                {meta.touched && meta.error ? (
                    <p
                        style={{ color: 'red' }}
                        className="MuiFormHelperText-root MuiFormHelperText-sizeMedium MuiFormHelperText-contained css-1wc848c-MuiFormHelperText-root"
                    >
                        {meta.error}
                    </p>
                ) : null}
            </FormControl>
        );
    };

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={authentificationFormOpen}
            onClose={() => dispatch(setAuthFormOpen(false))}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
        >
            <Fade in={authentificationFormOpen}>
                <Box sx={style}>
                    <Typography id="transition-modal-title" variant="h6" component="h2">
                        Вход в учетную запись TechRadar
                    </Typography>
                    <Formik
                        initialValues={{
                            email: '',
                            password: '',
                        }}
                        validationSchema={Yup.object({
                            email: Yup.string().email('Неправильный email адрес').required('Обязательное поле!'),
                            password: Yup.string()
                                .min(2, 'Минимум 2 символа для заполнения')
                                .required('Обязательное поле!'),
                        })}
                        onSubmit={(values: Values, { setSubmitting }: FormikHelpers<Values>) => {
                            setTimeout(() => {
                                dispatch(setAuthFormData(values));
                                dispatch(setAuthFormOpen(false));
                                setSubmitting(false);
                            }, 500);
                        }}
                    >
                        <Form className="form" style={{ display: 'flex', flexDirection: 'column' }}>
                            <MyTextInput label="Email" id="email" name="email" type="email" autoComplete="off" />
                            <MyPassInput
                                label="Пароль"
                                id="password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                autoComplete="off"
                            />
                            <Button type="submit" variant="contained" color="success" style={{ marginTop: 20 }}>
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
