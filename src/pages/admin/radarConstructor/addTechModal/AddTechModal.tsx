import { FC, useCallback } from 'react';
import { Box, Button, Modal, Typography } from '@mui/material';
import { Formik, FormikHelpers, Form } from 'formik';
import * as Yup from 'yup';

import { styles } from '../../../../components/modals/authFormModal/AuthFormModal';
import TextInputOutlined from '../../../../components/textInputOutlined/TextInputOutlined';
import { addNewBlip, setRadarConstrTechModalOpen } from '../../../../store/constructorRadarSlice';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import AddTechModalSelectInput from './AddTechModalSelectInput';

export interface AddTechModalData {
    name: string;
    ringName: string;
    sectorName: string;
}

const message = 'Обязательное поле!';

const validSchema = Yup.object({
    name: Yup.string().required(message),
    ringName: Yup.string().required(message),
    sectorName: Yup.string().required(message),
});

const AddTechModal: FC = () => {
    const dispatch = useAppDispatch();
    const showRadarConstrTechModal = useAppSelector((state) => state.constructorRadar.showRadarConstrTechModal);

    const ringNames = useAppSelector((state) => state.constructorRadar.ringNames);
    const sectorNames = useAppSelector((state) => state.constructorRadar.sectorNames);

    const handleClose = useCallback(() => dispatch(setRadarConstrTechModalOpen(false)), [dispatch]);

    return (
        <Modal
            open={showRadarConstrTechModal}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={styles.modal}>
                <Typography id="transition-modal-title" variant="h6" component="h2">
                    Добавление технологии
                </Typography>
                <Formik
                    initialValues={{
                        name: '',
                        ringName: ringNames[0],
                        sectorName: sectorNames[0],
                    }}
                    validationSchema={validSchema}
                    onSubmit={(values: AddTechModalData, { setSubmitting }: FormikHelpers<AddTechModalData>) => {
                        setSubmitting(false);
                        dispatch(addNewBlip(values));
                        dispatch(setRadarConstrTechModalOpen(false));
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form className="form auth-form">
                            <TextInputOutlined label="Название" name="name" placeholder="Введите название" />
                            <AddTechModalSelectInput id="ring" label={'Кольцо'} items={ringNames} name="ringName" />
                            <AddTechModalSelectInput
                                id="sector"
                                label={'Сектор'}
                                items={sectorNames}
                                name="sectorName"
                            />
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
