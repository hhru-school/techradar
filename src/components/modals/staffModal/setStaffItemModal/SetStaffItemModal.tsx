import { FC, useCallback, useState } from 'react';
import { Alert, Box, Button, CircularProgress, Modal, Typography } from '@mui/material';
import { Formik, FormikHelpers, Form } from 'formik';
import * as Yup from 'yup';

import { useSetStaffItemMutation } from '../../../../api/companiesApi';
import { styles } from '../../../../components/modals/authFormModal/AuthFormModal';
import TextInputOutlined from '../../../../components/textInputOutlined/TextInputOutlined';
import { setSetStaffItemModalOpen } from '../../../../store/companySlice';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';

export interface Values {
    username: string;
}

export interface Error {
    data: {
        message: string;
        status: string;
        timestamp: string;
        type: string;
    };
    status: number;
}

const validSchema = Yup.object({
    username: Yup.string().required('Обязательное поле!'),
});

const initialValues = {
    username: '',
};

const SetStaffItemModal: FC = () => {
    const dispatch = useAppDispatch();
    const showSetStaffItemModal = useAppSelector((state) => state.company.showSetStaffItemModal);
    const currentCompany = useAppSelector((state) => state.company.currentCompany);
    const [errMessage, setErrMessage] = useState<string | null>(null);
    const [setStaffItem, { isLoading }] = useSetStaffItemMutation();

    const handleClose = useCallback(() => dispatch(setSetStaffItemModalOpen(false)), [dispatch]);

    const handleSubmit = useCallback(
        async (values: Values, { setSubmitting }: FormikHelpers<Values>) => {
            if (currentCompany) {
                await setStaffItem({ username: values.username, companyId: currentCompany.id })
                    .unwrap()
                    .then(() => {
                        setErrMessage(null);
                        dispatch(setSetStaffItemModalOpen(false));
                        setSubmitting(false);
                    })
                    .catch((err: Error) => {
                        setErrMessage(err.data.message);
                    });
            }
        },
        [currentCompany, dispatch, setStaffItem]
    );

    const textCreateVersionBtn = isLoading ? (
        <CircularProgress color="inherit" sx={styles.progressCircle} />
    ) : (
        'Добавить'
    );

    return (
        <Modal
            open={showSetStaffItemModal}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={styles.modal}>
                <Typography id="transition-modal-title" variant="h6" component="h2">
                    Введите логин сотрудника
                </Typography>
                <Formik initialValues={initialValues} validationSchema={validSchema} onSubmit={handleSubmit}>
                    <Form className="form auth-form">
                        <TextInputOutlined
                            label="Логин"
                            type="text"
                            name="username"
                            placeholder="Введите логин сотрудника"
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
                        {errMessage && <Alert severity="error">{errMessage}</Alert>}
                    </Form>
                </Formik>
            </Box>
        </Modal>
    );
};

export default SetStaffItemModal;
