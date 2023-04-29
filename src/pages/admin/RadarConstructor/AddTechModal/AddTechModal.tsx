import { FC, useCallback } from 'react';
import { Box, Button, Modal, Typography, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { Formik, FormikHelpers, Form, useField } from 'formik';
import * as Yup from 'yup';

import { styleModal } from '../../../../components/AuthFormModal/AuthFormModal';
import TextInputOutlined from '../../../../components/textInputOutlined/TextInputOutlined';
import { setRadarConstrTechModalOpen, updateRadarConstrTechGrid } from '../../../../store/constructorRadarSlice';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';

type AddTechModalData = {
    techName: string;
    Circle: number;
    sector: number;
};

type PropsSelectInput = {
    label: string;
    countItems: number;
    name: string;
};

const MySelectInput = ({ label, countItems, ...props }: PropsSelectInput) => {
    const [field, meta] = useField(props);
    return (
        <FormControl sx={{ marginTop: '20px' }}>
            <InputLabel id="demo-simple-select-label">{label}</InputLabel>
            <Select {...props} {...field} labelId="demo-simple-select-label" id="demo-simple-select" label={label}>
                {new Array(countItems).fill({}).map((_, i) => (
                    <MenuItem value={i + 1}>{i + 1}</MenuItem>
                ))}
            </Select>
            {meta.touched && meta.error ? <div className="error">{meta.error}</div> : null}
        </FormControl>
    );
};

const validSchema = Yup.object({
    techName: Yup.string().required('Обязательное поле!'),
    Circle: Yup.number().required('Обязательное поле!'),
    sector: Yup.number().required('Обязательное поле!'),
});

const AddTechModal: FC = () => {
    const dispatch = useAppDispatch();
    const showRadarConstrTechModal = useAppSelector((state) => state.constructorRadar.showRadarConstrTechModal);
    const countSectors = useAppSelector((state) => state.constructorRadar.countSectorInputs);
    const countRings = useAppSelector((state) => state.constructorRadar.countCircleInputs);

    const handleClose = useCallback(() => dispatch(setRadarConstrTechModalOpen(false)), [dispatch]);

    return (
        <Modal
            open={showRadarConstrTechModal}
            onClose={handleClose}
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
                        Circle: 1,
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
                            <TextInputOutlined label="Название" name="techName" placeholder="Введите название" />
                            <MySelectInput label="Кольцо" name="Circle" countItems={countRings} />
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
