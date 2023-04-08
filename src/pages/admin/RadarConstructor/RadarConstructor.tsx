import { FC, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Divider, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Fab from '@mui/material/Fab';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import List from '@mui/material/List';
import NativeSelect from '@mui/material/NativeSelect';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import { Formik, Form, useField, FormikHelpers } from 'formik';
import * as Yup from 'yup';

interface Values {
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

const MyTextInput = ({ label, ...props }: InputProps) => {
    const [field, meta] = useField(props);
    return (
        <TextField
            label={label}
            variant="outlined"
            {...field}
            {...props}
            helperText={meta.error}
            style={{ marginTop: 20, width: 280 }}
        />
    );
};

const RadarConstructor: FC = () => {
    const [checked, setChecked] = useState(false);

    const handleChange = () => {
        setChecked((prev) => !prev);
    };

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
                            xs={3}
                            md={3}
                            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                        >
                            <Typography variant="h5">Конструктор радара</Typography>
                        </Grid>
                        <Grid item xs>
                            <Stack direction="row" justifyContent={'flex-end'} spacing={3}>
                                <Fab variant="extended" color="primary">
                                    <AddIcon />
                                    добавить технологию
                                </Fab>
                                <FormControlLabel
                                    control={<Switch checked={checked} onChange={handleChange} />}
                                    label="Сделать публичным после создания"
                                />
                                <FormControl style={{ width: 200 }}>
                                    <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                        Взять за основу сущестующий
                                    </InputLabel>
                                    <NativeSelect
                                        defaultValue={'all'}
                                        inputProps={{
                                            name: 'privacy',
                                            id: 'privacy',
                                        }}
                                    >
                                        <option value={'all'}>Нет</option>
                                        <option value={'radar 1'}>Радар 1</option>
                                        <option value={'radar 2'}>Радар 2</option>
                                        <option value={'radar 3'}>Радар 3</option>
                                    </NativeSelect>
                                </FormControl>
                                <Button variant="contained" color="success">
                                    Создать
                                </Button>
                            </Stack>
                        </Grid>
                    </Grid>
                    <Divider />

                    <List
                        sx={{
                            width: '100%',
                            maxWidth: 300,
                            bgcolor: 'background.paper',
                            position: 'relative',
                            overflow: 'auto',
                            maxHeight: 700,
                        }}
                    >
                        <MyTextInput label="Название радара" id="name" name="name" type="text" autoComplete="off" />
                        <MyTextInput
                            label="Название квадранта 1"
                            id="name-quadrant-1"
                            name="name-quadrant-1"
                            type="text"
                            autoComplete="off"
                        />
                        <MyTextInput
                            label="Название квадранта 2"
                            id="name-quadrant-2"
                            name="name-quadrant-2"
                            type="text"
                            autoComplete="off"
                        />
                        <MyTextInput
                            label="Название квадранта 3"
                            id="name-quadrant-3"
                            name="name-quadrant-3"
                            type="text"
                            autoComplete="off"
                        />
                        <MyTextInput
                            label="Название квадранта 4"
                            id="name-quadrant-4"
                            name="name-quadrant-4"
                            type="text"
                            autoComplete="off"
                        />
                        <MyTextInput
                            label="Количество колец"
                            id="cercle-count"
                            name="cercle-count"
                            type="number"
                            autoComplete="off"
                        />
                        <MyTextInput
                            label="Название кольца 1"
                            id="name-cercle-1"
                            name="name-cercle-1"
                            type="text"
                            autoComplete="off"
                        />
                        <MyTextInput
                            label="Название кольца 2"
                            id="name-cercle-2"
                            name="name-cercle-2"
                            type="text"
                            autoComplete="off"
                        />
                        <MyTextInput
                            label="Название кольца 3"
                            id="name-cercle-3"
                            name="name-cercle-3"
                            type="text"
                            autoComplete="off"
                        />
                        <MyTextInput
                            label="Название кольца 4"
                            id="name-cercle-4"
                            name="name-cercle-4"
                            type="text"
                            autoComplete="off"
                        />
                    </List>
                </Form>
            </Formik>
        </Container>
    );
};

export default RadarConstructor;
