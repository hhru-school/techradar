import { FC, useCallback } from 'react';
import { Box, Button, Modal, Typography } from '@mui/material';
import { Formik, FormikHelpers, Form } from 'formik';
import * as Yup from 'yup';

import { styleModal } from '../../../../components/modals/authFormModal/AuthFormModal';
import TextInputOutlined from '../../../../components/textInputOutlined/TextInputOutlined';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { setRadarsCreateModalOpen } from '../../../../store/myRadarsSlice';

export interface Values {
    name: string;
}

const validSchema = Yup.object({
    name: Yup.string().required('Обязательное поле!'),
});

const MyRadarCreateModal: FC = () => {
    const dispatch = useAppDispatch();
    const showRadarsCreateModal = useAppSelector((state) => state.myRadars.showRadarsCreateModal);

    const handleClose = useCallback(() => dispatch(setRadarsCreateModalOpen(false)), [dispatch]);

    return (
        <Modal
            open={showRadarsCreateModal}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={styleModal}>
                <Typography id="transition-modal-title" variant="h6" component="h2">
                    Введите название для нового радар
                </Typography>
                <Formik
                    initialValues={{
                        name: '',
                    }}
                    validationSchema={validSchema}
                    onSubmit={(values: Values, { setSubmitting }: FormikHelpers<Values>) => {
                        dispatch(setRadarsCreateModalOpen(false));
                        setSubmitting(false);
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form className="form auth-form">
                            <TextInputOutlined
                                label="Название"
                                type="text"
                                name="name"
                                placeholder="Введите название раздела"
                            />
                            <Button
                                disabled={isSubmitting}
                                type="submit"
                                variant="contained"
                                color="success"
                                sx={{ marginTop: '20px' }}
                            >
                                Создать раздел
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Modal>
    );
};

export default MyRadarCreateModal;
