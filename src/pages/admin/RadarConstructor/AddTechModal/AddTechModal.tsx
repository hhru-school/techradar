import { FC } from 'react';
import { Box, Button, Modal, Typography, TextField, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { Formik, FormikHelpers, Form, useField } from 'formik';
import * as Yup from 'yup';

import { styleModal } from '../../../../components/AuthFormModal/AuthFormModal';
import { setRadarConstrTechModalOpen, updateRadarConstrTechGrid } from '../../../../store/dataSlice';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';

type AddTechModalData = {
    techName: string;
    cercle: number;
    sector: number;
};

type PropsInput = {
    label: string;
    placeholder: string;
    name: string;
};

type PropsSelectInput = {
    label: string;
    countItems: number;
    name: string;
};

const MyTextInput = (props: PropsInput) => {
    const [field, meta] = useField(props);
    return (
        <>
            <TextField {...props} {...field} sx={{ marginTop: '20px' }} variant="outlined" id="outlined-basic" />
            {meta.touched && meta.error ? <div className="error">{meta.error}</div> : null}
        </>
    );
};

const renderItems = (count: number) => {
    const arr = [];
    for (let i = 1; i < count + 1; i++) {
        arr.push(<MenuItem value={i}>{i}</MenuItem>);
    }
    return arr;
};

const MySelectInput = ({ label, countItems, ...props }: PropsSelectInput) => {
    const [field, meta] = useField(props);
    return (
        <FormControl sx={{ marginTop: '20px' }}>
            <InputLabel id="demo-simple-select-label">{label}</InputLabel>
            <Select {...props} {...field} labelId="demo-simple-select-label" id="demo-simple-select" label={label}>
                {renderItems(countItems).map((item) => {
                    return item;
                })}
            </Select>
            {meta.touched && meta.error ? <div className="error">{meta.error}</div> : null}
        </FormControl>
    );
};

const validSchema = Yup.object({
    techName: Yup.string().required('Обязательное поле!'),
    cercle: Yup.number().required('Обязательное поле!'),
    sector: Yup.number().required('Обязательное поле!'),
});

const AddTechModal: FC = () => {
    const dispatch = useAppDispatch();
    const showRadarConstrTechModal = useAppSelector((state) => state.data.showRadarConstrTechModal);
    const countSectors = useAppSelector((state) => state.data.countSectorInputs);
    const countCercles = useAppSelector((state) => state.data.countCercleInputs);

    return (
        <Modal
            open={showRadarConstrTechModal}
            onClose={() => dispatch(setRadarConstrTechModalOpen(false))}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={styleModal}>
                <Typography id="transition-modal-title" variant="h6" component="h2">
                    Добавление технологии
                </Typography>
                <Formik
                    initialValues={{
                        techName: '',
                        cercle: 1,
                        sector: 1,
                    }}
                    validationSchema={validSchema}
                    onSubmit={(values: AddTechModalData, { setSubmitting }: FormikHelpers<AddTechModalData>) => {
                        dispatch(updateRadarConstrTechGrid({ id: values.techName, ...values }));
                        dispatch(setRadarConstrTechModalOpen(false));
                        setSubmitting(false);
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form className="form auth-form">
                            <MyTextInput label="Название" name="techName" placeholder="Введите название" />
                            <MySelectInput label="Кольцо" name="cercle" countItems={countCercles} />
                            <MySelectInput label="Сектор" name="sector" countItems={countSectors} />
                            <Button
                                disabled={isSubmitting}
                                type="submit"
                                variant="contained"
                                color="success"
                                sx={{ marginTop: '20px' }}
                            >
                                Добавить
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Modal>
    );
};

export default AddTechModal;
