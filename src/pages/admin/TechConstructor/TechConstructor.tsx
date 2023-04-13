import { FC } from 'react';
import { Link } from 'react-router-dom';
import AdjustIcon from '@mui/icons-material/Adjust';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import {
    Divider,
    Typography,
    Button,
    Container,
    FormControl,
    FormHelperText,
    Grid,
    Input,
    InputAdornment,
    InputLabel,
    List,
    Stack,
    Box,
    TextField,
} from '@mui/material';
import { Formik, Form, useField, FormikHelpers } from 'formik';
import * as Yup from 'yup';

import { useAppSelector } from '../../../store/hooks';

interface Values {
    email: string;
    password: string;
}

type InputProps = {
    label: string;
    name: string;
    id?: string;
    type: string;
    autoComplete?: string;
};

const MyTextInput = ({ label, id, ...props }: InputProps) => {
    const [field, meta] = useField(props);

    let icon;
    switch (id) {
        case 'name':
            icon = <ContactSupportIcon />;
            break;
        case 'name-quadrant-1':
            icon = <DashboardCustomizeIcon sx={{ transform: 'rotate(-90deg)' }} />;
            break;
        case 'name-quadrant-2':
            icon = <DashboardCustomizeIcon />;
            break;
        case 'name-quadrant-3':
            icon = <DashboardCustomizeIcon sx={{ transform: 'rotate(90deg)' }} />;
            break;
        case 'name-quadrant-4':
            icon = <DashboardCustomizeIcon sx={{ transform: 'rotate(180deg)' }} />;
            break;
        case 'cercle-count':
            icon = <FormatListNumberedIcon />;
            break;
        case 'name-cercle':
            icon = <AdjustIcon />;
            break;
        default:
            break;
    }

    return (
        <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
            <InputLabel htmlFor={id}>{label}</InputLabel>
            <Input
                id={id}
                {...field}
                {...props}
                aria-describedby="standard-weight-helper-text"
                inputProps={{
                    'aria-label': 'weight',
                }}
                endAdornment={<InputAdornment position="end">{icon}</InputAdornment>}
            />
            <FormHelperText id="helper-text">{meta.error}</FormHelperText>
        </FormControl>
    );
};

const TechConstructor: FC = () => {
    const inputs = useAppSelector((state) => state.data.techContructorInputs);

    return (
        <Container maxWidth="xl">
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                }}
                validationSchema={Yup.object({
                    email: Yup.string().email('Неправильный email адрес').required('Обязательное поле!'),
                    password: Yup.string().min(2, 'Минимум 2 символа для заполнения').required('Обязательное поле!'),
                })}
                onSubmit={(values: Values, { setSubmitting }: FormikHelpers<Values>) => {
                    setTimeout(() => {
                        setSubmitting(false);
                    }, 500);
                }}
            >
                <Form className="form">
                    <Grid container spacing={3} sx={{ padding: '10px 0', display: 'flex' }}>
                        <Grid
                            item
                            xs={1}
                            md={1}
                            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                        >
                            <Link
                                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                                to="/my-tech"
                            >
                                <ArrowBackIosIcon /> НАЗАД
                            </Link>
                        </Grid>
                        <Grid
                            item
                            xs={3}
                            md={3}
                            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                        >
                            <Typography variant="h5">Конструктор технологии</Typography>
                        </Grid>
                        <Grid item xs>
                            <Stack direction="row" justifyContent={'flex-end'} spacing={3}>
                                <Button disabled={true} variant="contained" color="success">
                                    Создать
                                </Button>
                            </Stack>
                        </Grid>
                    </Grid>
                    <Divider />
                    <Grid container spacing={2} sx={{ mt: '5px' }}>
                        <Grid item xs={3}>
                            <List
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    width: '100%',
                                    bgcolor: 'background.paper',
                                    position: 'relative',
                                    overflow: 'auto',
                                    maxHeight: '95%',
                                }}
                            >
                                {inputs.map((item, i) => {
                                    return (
                                        <MyTextInput
                                            key={i}
                                            label={item.label}
                                            id={item.id}
                                            name={item.name}
                                            type={item.type}
                                            autoComplete={item.autoComplete}
                                        />
                                    );
                                })}
                            </List>
                        </Grid>
                        <Grid
                            item
                            xs={6}
                            sx={{
                                maxHeight: '80vh',
                            }}
                        >
                            <Typography variant="h5">Описание</Typography>
                            <TextField
                                id="standard-multiline-flexible"
                                multiline
                                variant="standard"
                                sx={{ width: '100%', maxHeight: '35vh' }}
                                placeholder="Введите описание"
                            />
                        </Grid>
                        <Grid
                            item
                            xs={3}
                            sx={{
                                maxHeight: '80vh',
                            }}
                        >
                            <Typography variant="h5">Лог изменений</Typography>
                            <Box
                                sx={{
                                    boxSizing: 'border-box',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    width: '100%',
                                    bgcolor: 'background.paper',
                                    position: 'relative',
                                    overflow: 'auto',
                                    maxHeight: '95%',
                                    borderRadius: '5px',
                                    padding: '15px 15px',
                                    border: '1px solid',
                                    borderColor: 'rgba(0, 0, 0, 0.23)',
                                }}
                            >
                                {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((_, index) => (
                                    <Box key={index} sx={{ borderBottom: '1px solid', marginBottom: '10px' }}>
                                        <Typography>
                                            <strong>
                                                11/04/2023 <br />
                                                20:22
                                            </strong>
                                            <br />
                                            Добавил преимущество, изменил ссылку на доку
                                        </Typography>
                                    </Box>
                                ))}
                            </Box>
                        </Grid>
                    </Grid>
                </Form>
            </Formik>
        </Container>
    );
};

export default TechConstructor;
