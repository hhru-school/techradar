import { FC, useState, ReactElement, useCallback } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
    Container,
    FormControl,
    FormHelperText,
    Grid,
    Input,
    InputLabel,
    TextField,
    Box,
    Button,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
} from '@mui/material';
import { Formik, Form, useField, FormikHelpers } from 'formik';
import * as Yup from 'yup';

import { setRadarConstrTechModalOpen } from '../../../store/constructorRadarSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import AddTechModal from './AddTechModal/AddTechModal';
import CircleInputs from './CircleInputs/CircleInputs';
import RadarConstructorGrid from './RadarConstructorGrid/RadarConstructorGrid';
import RadarPublishBtn from './RadarPublishBtn/RadarPublishBtn';
import SectorInputs from './SectorInputs/SectorInputs';

import './RadarConstructor.less';

interface Values {
    radarName: string;
    nameCircle1: string;
    nameCircle2: string;
    nameCircle3: string;
    nameCircle4: string;
    nameSector1: string;
    nameSector2: string;
    nameSector3: string;
    nameSector4: string;
}

export interface InputProps {
    label: string;
    name: string;
    id?: string;
    type: string;
    autoComplete: string;
}

export const MyTextInput = ({ label, id, ...props }: InputProps): ReactElement => {
    const [field, meta] = useField(props);

    return (
        <FormControl sx={{ m: 1, width: '160px' }} variant="standard">
            <InputLabel htmlFor={id}>{label}</InputLabel>
            <Input
                id={id}
                {...field}
                {...props}
                aria-describedby="helper-text"
                inputProps={{
                    'aria-label': 'radar-input',
                }}
            />
            <FormHelperText id="helper-text">{meta.error}</FormHelperText>
        </FormControl>
    );
};

type RadarInput = {
    id: number | string;
    name: string;
    label: string;
    placeholder: string;
};

const RadarNameInput = ({ label, id, ...props }: RadarInput): ReactElement => {
    const [field, meta] = useField(props);
    const [editNameReadOnly, setEditNameReadOnly] = useState<boolean>(true);

    return (
        <Box>
            <TextField
                {...field}
                {...props}
                name="radarName"
                onBlur={() => setEditNameReadOnly(true)}
                id="radarName"
                label="Название радара"
                InputProps={{
                    readOnly: editNameReadOnly,
                    endAdornment: (
                        <label className="radarNameLabel" htmlFor={editNameReadOnly ? '' : 'radarName'}>
                            <MoreVertIcon
                                color="primary"
                                sx={{ cursor: 'pointer' }}
                                onClick={() => setEditNameReadOnly(!editNameReadOnly)}
                            />
                        </label>
                    ),
                }}
                placeholder="Введите название радара"
            />
            <FormHelperText id="helper-text">{meta.error}</FormHelperText>
        </Box>
    );
};

const formikInitValues = {
    radarName: '',
    nameCircle1: '',
    nameCircle2: '',
    nameCircle3: '',
    nameCircle4: '',
    nameSector1: '',
    nameSector2: '',
    nameSector3: '',
    nameSector4: '',
};

const formikValid = Yup.object({
    radarName: Yup.string().required('Обязательное поле!'),
    nameCircle1: Yup.string().required('Обязательное поле!'),
    nameCircle2: Yup.string().required('Обязательное поле!'),
    nameCircle3: Yup.string().required('Обязательное поле!'),
    nameCircle4: Yup.string().required('Обязательное поле!'),
    nameSector1: Yup.string().required('Обязательное поле!'),
    nameSector2: Yup.string().required('Обязательное поле!'),
    nameSector3: Yup.string().required('Обязательное поле!'),
    nameSector4: Yup.string().required('Обязательное поле!'),
});

const RadarConstructor: FC = () => {
    const dispatch = useAppDispatch();
    const showRadarConstrTechModal = useAppSelector((state) => state.constructorRadar.showRadarConstrTechModal);

    const handleClick = useCallback(() => dispatch(setRadarConstrTechModalOpen(true)), [dispatch]);

    return (
        <Container maxWidth="xl">
            <Formik
                initialValues={formikInitValues}
                validationSchema={formikValid}
                onSubmit={(values: Values, { setSubmitting }: FormikHelpers<Values>) => {
                    setTimeout(() => {
                        // console.log(values);
                        setSubmitting(false);
                    }, 500);
                }}
            >
                <Form className="form">
                    <Grid
                        container
                        spacing={3}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            minHeight: '125px',
                            justifyContent: 'center',
                        }}
                    >
                        <Grid item sm={6} sx={{ padding: '15px 0 0 0' }}>
                            <RadarNameInput
                                name="radarName"
                                id="radarName"
                                label="Название радара"
                                placeholder="Введите название радара"
                            />
                        </Grid>
                        <Grid item sm={4}>
                            <RadarPublishBtn />
                        </Grid>
                        <Grid item sm={1}>
                            <Button type="submit" variant="contained" color={'success'}>
                                СОХРАНИТЬ
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item sm={8}>
                            {/* РАДАР СУВАТЬ СЮДА */}
                        </Grid>
                        <Grid
                            item
                            sm={4}
                            sx={{
                                width: '280px',
                            }}
                        >
                            <Grid
                                item
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                }}
                            >
                                <Grid item sx={{ width: '100%' }}>
                                    <Accordion>
                                        <AccordionSummary expandIcon={<ExpandMoreIcon />} id="edit-settings">
                                            <Typography>Кольца и секторы</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails sx={{ display: 'flex', flexDirection: 'row' }}>
                                            <CircleInputs />
                                            <SectorInputs />
                                        </AccordionDetails>
                                    </Accordion>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0' }}>
                                    <Typography sx={{ textAlign: 'center' }} variant="h5">
                                        Технологии
                                    </Typography>
                                    <Button onClick={handleClick} variant="contained" color={'success'}>
                                        + Добавить
                                    </Button>
                                </Box>
                                <RadarConstructorGrid />
                            </Grid>
                        </Grid>
                    </Grid>
                </Form>
            </Formik>
            {showRadarConstrTechModal && <AddTechModal />}
        </Container>
    );
};

export default RadarConstructor;
