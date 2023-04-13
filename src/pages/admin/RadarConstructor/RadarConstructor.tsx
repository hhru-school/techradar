import { FC, useState, SetStateAction, ChangeEvent, Dispatch } from 'react';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import AdjustIcon from '@mui/icons-material/Adjust';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
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
} from '@mui/material';
import { Formik, Form, useField, FormikHelpers } from 'formik';
import * as Yup from 'yup';

import { useAppSelector } from '../../../store/hooks';
import SideBar from '../CommentsSideBar/CommentsSideBar';
import RadarConstructorTechCard from './RadarConstructorTechCard';

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

type CercleInputProps = {
    label: string;
    name: string;
    id?: string;
    type: string;
    autoComplete: string;
    onChangeFunc: Dispatch<SetStateAction<number>>;
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
                aria-describedby="helper-text"
                inputProps={{
                    'aria-label': 'radar-input',
                }}
                endAdornment={<InputAdornment position="end">{icon}</InputAdornment>}
            />
            <FormHelperText id="helper-text">{meta.error}</FormHelperText>
        </FormControl>
    );
};

const CountCercleInput = ({ label, id, onChangeFunc, ...props }: CercleInputProps) => {
    const [field, meta] = useField(props);

    return (
        <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
            <InputLabel htmlFor={id}>{label}</InputLabel>
            <Input
                id={id}
                {...field}
                {...props}
                aria-describedby="helper-text"
                inputProps={{
                    'aria-label': 'radar-input',
                }}
                onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeFunc(+e.target.value)}
                endAdornment={<InputAdornment position="end">{<FormatListNumberedIcon />}</InputAdornment>}
            />
            <FormHelperText id="helper-text">{meta.error}</FormHelperText>
        </FormControl>
    );
};

const RadarConstructor: FC = () => {
    const inputs = useAppSelector((state) => state.data.radarConstructorInputs);

    const [checked, setChecked] = useState(false);
    const [expanded, setExpanded] = useState(true);
    const [countCercleInputs, setCountCercleInputs] = useState<number>(4);

    const CercleInputs = [];

    const handleChange = () => {
        setChecked((prev) => !prev);
    };

    for (let i = 0; i < countCercleInputs; i++) {
        CercleInputs.push(MyTextInput);
    }

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
                                to="/my-radars"
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
                            <Typography variant="h5">Конструктор радара</Typography>
                        </Grid>
                        <Grid item xs>
                            <Stack direction="row" justifyContent={'flex-end'} spacing={3}>
                                <SideBar />
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
                                <CountCercleInput
                                    label={'Количество колец'}
                                    id={'cercle-count'}
                                    name={'cercle-count'}
                                    type={'number'}
                                    autoComplete={'off'}
                                    onChangeFunc={setCountCercleInputs}
                                />
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
                                <RadarConstructorTechCard />
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
