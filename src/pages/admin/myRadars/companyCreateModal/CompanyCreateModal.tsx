import { FC, useCallback, useState } from 'react';
import { Alert, Box, Button, CircularProgress, Modal, Typography } from '@mui/material';
import { Formik, FormikHelpers, Form } from 'formik';
import * as Yup from 'yup';

import { useCreateNewCompanyMutation } from '../../../../api/companiesApi';
import { CreateNewCompanyResponse, ErrorRes } from '../../../../api/types';
import { styles } from '../../../../components/modals/authFormModal/AuthFormModal';
import TextInputOutlined from '../../../../components/textInputOutlined/TextInputOutlined';
import { setCreateCompanyModalOpen, setCurrentCompany } from '../../../../store/companySlice';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';

export interface Values {
    name: string;
}

const validSchema = Yup.object({
    name: Yup.string().required('Обязательное поле!'),
});

const initialValues = {
    name: '',
};

const CompanyCreateModal: FC = () => {
    const dispatch = useAppDispatch();
    const showCreateCompanyModal = useAppSelector((state) => state.company.showCreateCompanyModal);
    const [errMessage, setErrMessage] = useState<string | null>(null);
    const [createNewCompany, { isLoading }] = useCreateNewCompanyMutation();

    const handleClose = useCallback(() => dispatch(setCreateCompanyModalOpen(false)), [dispatch]);

    const handleSubmit = useCallback(
        async (values: Values, { setSubmitting }: FormikHelpers<Values>) => {
            await createNewCompany({ name: values.name })
                .unwrap()
                .then((company: CreateNewCompanyResponse) => {
                    setErrMessage(null);
                    dispatch(setCurrentCompany(company));
                    dispatch(setCreateCompanyModalOpen(false));
                    setSubmitting(false);
                })
                .catch((err: ErrorRes) => {
                    setErrMessage(err.data.message);
                });
        },
        [createNewCompany, dispatch]
    );

    const textCreateVersionBtn = isLoading ? (
        <CircularProgress color="inherit" sx={styles.progressCircle} />
    ) : (
        'добавить'
    );

    return (
        <Modal
            open={showCreateCompanyModal}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={styles.modal}>
                <Typography id="transition-modal-title" variant="h6" component="h2">
                    Введите название компании
                </Typography>
                <Formik initialValues={initialValues} validationSchema={validSchema} onSubmit={handleSubmit}>
                    <Form className="form auth-form">
                        <TextInputOutlined
                            label="Название"
                            type="text"
                            name="name"
                            placeholder="Введите название новой компании"
                            disabled={isLoading}
                        />
                        <Button
                            disabled={isLoading}
                            type="submit"
                            variant="contained"
                            color="success"
                            sx={styles.btnSuccess}
                        >
                            {textCreateVersionBtn}
                        </Button>
                        <Button type="button" variant="outlined" sx={styles.btnSuccess} onClick={handleClose}>
                            отмена
                        </Button>
                        {errMessage && <Alert severity="error">{errMessage}</Alert>}
                    </Form>
                </Formik>
            </Box>
        </Modal>
    );
};

export default CompanyCreateModal;
