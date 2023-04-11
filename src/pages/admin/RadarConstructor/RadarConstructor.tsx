import { FC, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import AdjustIcon from '@mui/icons-material/Adjust';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import {
    Divider,
    Typography,
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    Container,
    Fab,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Grid,
    Input,
    InputAdornment,
    InputLabel,
    List,
    NativeSelect,
    Stack,
    Switch,
    TextField,
} from '@mui/material';
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
            <FormHelperText id="standard-weight-helper-text">{meta.error}</FormHelperText>
        </FormControl>
    );
};

const inputs = [
    {
        label: 'Название радара',
        id: 'name',
        name: 'name',
        type: 'text',
        autoComplete: 'off',
    },
    {
        label: 'Название квадранта 1',
        id: 'name-quadrant-1',
        name: 'name-quadrant-1',
        type: 'text',
        autoComplete: 'off',
    },
    {
        label: 'Название квадранта 2',
        id: 'name-quadrant-2',
        name: 'name-quadrant-2',
        type: 'text',
        autoComplete: 'off',
    },
    {
        label: 'Название квадранта 3',
        id: 'name-quadrant-3',
        name: 'name-quadrant-3',
        type: 'text',
        autoComplete: 'off',
    },
    {
        label: 'Название квадранта 4',
        id: 'name-quadrant-4',
        name: 'name-quadrant-4',
        type: 'text',
        autoComplete: 'off',
    },
    {
        label: 'Количество колец',
        id: 'cercle-count',
        name: 'cercle-count',
        type: 'number',
        autoComplete: 'off',
    },
    {
        label: 'Название кольца 1',
        id: 'name-cercle',
        name: 'name-cercle-1',
        type: 'text',
        autoComplete: 'off',
    },
    {
        label: 'Название кольца 2',
        id: 'name-cercle',
        name: 'name-cercle-2',
        type: 'text',
        autoComplete: 'off',
    },
    {
        label: 'Название кольца 3',
        id: 'name-cercle',
        name: 'name-cercle-3',
        type: 'text',
        autoComplete: 'off',
    },
    {
        label: 'Название кольца 4',
        id: 'name-cercle',
        name: 'name-cercle-4',
        type: 'text',
        autoComplete: 'off',
    },
];

const RadarConstructor: FC = () => {
    const [checked, setChecked] = useState(false);
    const [expanded, setExpanded] = useState(true);

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
                                <FormControlLabel
                                    control={<Switch checked={checked} onChange={handleChange} />}
                                    label="Сделать публичным после создания"
                                />
                                <Button disabled={true} variant="contained" color="success">
                                    Создать
                                </Button>
                            </Stack>
                        </Grid>
                    </Grid>
                    <Divider />
                    <Accordion sx={{ width: 300, mt: '5px', border: 0 }} expanded={expanded}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            onClick={() => setExpanded(!expanded)}
                        >
                            <Typography>Настройки радара</Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{ height: '58vh', padding: '0 16px 8px 16px' }}>
                            <List
                                sx={{
                                    width: '100%',
                                    bgcolor: 'background.paper',
                                    position: 'relative',
                                    overflow: 'auto',
                                    maxHeight: '95%',
                                }}
                            >
                                {inputs.map((item) => {
                                    return (
                                        <MyTextInput
                                            label={item.label}
                                            id={item.id}
                                            name={item.name}
                                            type={item.type}
                                            autoComplete={item.autoComplete}
                                        />
                                    );
                                })}
                            </List>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion sx={{ width: 300 }} expanded={!expanded}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                            onClick={() => setExpanded(!expanded)}
                        >
                            <Typography>Добавление технологий</Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{ height: '58vh' }}>
                            <List
                                sx={{
                                    width: '100%',
                                    bgcolor: 'background.paper',
                                    position: 'relative',
                                    overflow: 'auto',
                                    maxHeight: '100%',
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between',
                                        marginTop: '10px',
                                        borderRadius: '5px',
                                        padding: '10px 10px',
                                        border: '1px solid',
                                        borderColor: 'rgba(0, 0, 0, 0.23)',
                                        height: '200px',
                                    }}
                                >
                                    <TextField
                                        label="Название технологии"
                                        id="standard-size-small"
                                        defaultValue=""
                                        size="small"
                                        variant="standard"
                                    />
                                    <FormControl fullWidth>
                                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                            Квадрант
                                        </InputLabel>
                                        <NativeSelect
                                            defaultValue={30}
                                            inputProps={{
                                                name: 'age',
                                                id: 'uncontrolled-native',
                                            }}
                                        >
                                            <option value={1}>1</option>
                                            <option value={2}>2</option>
                                            <option value={3}>3</option>
                                            <option value={4}>4</option>
                                        </NativeSelect>
                                    </FormControl>
                                    <FormControl fullWidth>
                                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                            Сектор
                                        </InputLabel>
                                        <NativeSelect
                                            defaultValue={30}
                                            inputProps={{
                                                name: 'age',
                                                id: 'uncontrolled-native',
                                            }}
                                        >
                                            <option value={1}>1</option>
                                            <option value={2}>2</option>
                                            <option value={3}>3</option>
                                            <option value={4}>4</option>
                                        </NativeSelect>
                                    </FormControl>
                                    <TextField
                                        label="Комментарий"
                                        id="standard-size-small"
                                        defaultValue=""
                                        size="small"
                                        variant="standard"
                                    />
                                </Box>
                            </List>
                            <Fab variant="extended" color="primary">
                                <AddIcon />
                                добавить технологию
                            </Fab>
                        </AccordionDetails>
                    </Accordion>
                </Form>
            </Formik>
        </Container>
    );
};

export default RadarConstructor;
