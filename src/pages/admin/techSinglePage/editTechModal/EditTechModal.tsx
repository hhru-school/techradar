import { FC, useCallback, useMemo, useState } from 'react';
import { Alert, Box, Button, CircularProgress, Modal, Typography } from '@mui/material';
import { Formik, FormikHelpers, Form } from 'formik';
import * as Yup from 'yup';

import { useUpdateBlipMutation } from '../../../../api/blipsSinglePageApi';
import { NewVersionError, BlipResponse } from '../../../../api/types';
import { styles } from '../../../../components/modals/authFormModal/AuthFormModal';
import TextInputOutlined from '../../../../components/textInputOutlined/TextInputOutlined';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { setEditTechModalOpen, setTechData } from '../../../../store/techSinglePageSlice';

export interface Values {
    name: string;
    description: string;
}

const validSchema = Yup.object({
    name: Yup.string().required('Обязательно введите название!'),
    description: Yup.string().required('Введите описание!'),
});

const EditTechModal: FC = () => {
    const dispatch = useAppDispatch();
    const showEditTechModal = useAppSelector((state) => state.techSinglePage.showEditTechModal);
    const techData = useAppSelector((state) => state.techSinglePage.techData);
    const [errMessage, setErrMessage] = useState<string | null>(null);
    const [updateBlip, { isLoading }] = useUpdateBlipMutation();

    const initialValues = useMemo(
        () => ({
            name: techData.name,
            description: techData.description,
        }),
        [techData.description, techData.name]
    );

    const handleClose = useCallback(() => dispatch(setEditTechModalOpen(false)), [dispatch]);

    const handleSubmit = useCallback(
        async (values: Values, { setSubmitting }: FormikHelpers<Values>) => {
            await updateBlip({
                blipId: techData.id,
                body: { name: values.name, description: values.description },
            })
                .unwrap()
                .then(({ name, description, id, radarId }: BlipResponse) => {
                    setErrMessage(null);
                    dispatch(setTechData({ name, description, id, radarId }));
                    dispatch(setEditTechModalOpen(false));
                    setSubmitting(false);
                })
                .catch((err: NewVersionError) => {
                    setErrMessage(err.error);
                });
        },
        [dispatch, techData.id, updateBlip]
    );

    const textSaveBtn = isLoading ? <CircularProgress color="inherit" sx={styles.progressCircle} /> : 'Сохранить';

    return (
        <Modal
            open={showEditTechModal}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={styles.modal}>
                <Typography id="transition-modal-title" variant="h6" component="h2">
                    Редактирование данных технологии
                </Typography>
                <Formik initialValues={initialValues} validationSchema={validSchema} onSubmit={handleSubmit}>
                    <Form className="form auth-form">
                        <TextInputOutlined
                            label="Название"
                            type="text"
                            name="name"
                            placeholder="Введите название"
                            disabled={isLoading}
                            multiline
                            rows={2}
                        />
                        <TextInputOutlined
                            label="Описание"
                            type="text"
                            name="description"
                            placeholder="Введите описание"
                            disabled={isLoading}
                            multiline
                            rows={10}
                        />
                        <Button
                            disabled={isLoading}
                            type="submit"
                            variant="contained"
                            color="success"
                            sx={styles.btnSuccess}
                        >
                            {textSaveBtn}
                        </Button>
                        {errMessage && <Alert severity="error">{errMessage}</Alert>}
                    </Form>
                </Formik>
            </Box>
        </Modal>
    );
};

export default EditTechModal;
