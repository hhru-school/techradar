import { FC, useCallback } from 'react';
import { Box, Button, Modal, Typography } from '@mui/material';
import { Formik, FormikHelpers, Form } from 'formik';
import * as Yup from 'yup';

import { styleModal } from '../../../../components/authFormModal/AuthFormModal';
import TextInputOutlined from '../../../../components/textInputOutlined/TextInputOutlined';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { createNewTech, setTechCreateModalOpen } from '../../../../store/myTechSlice';

export interface ValuesTechModal {
    link: string;
    techName: string;
    relevantAt: string;
    lastVersion: string;
    comment: string;
}

const validSchema = Yup.object({
    techName: Yup.string().required('Обязательное поле!'),
    link: Yup.string().required('Обязательное поле!'),
    relevantAt: Yup.string().required('Обязательное поле!'),
    lastVersion: Yup.string().required('Обязательное поле!'),
    comment: Yup.string().required('Обязательное поле!'),
});

const MyTechCreateModal: FC = () => {
    const dispatch = useAppDispatch();
    const showTechCreateModal = useAppSelector((state) => state.myTech.showTechCreateModal);

    const handleClose = useCallback(() => dispatch(setTechCreateModalOpen(false)), [dispatch]);

    return (
        <Modal
            open={showTechCreateModal}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={styleModal}>
                <Typography id="transition-modal-title" variant="h6" component="h2">
                    Хотите создать новую технологию?
                </Typography>
                <Formik
                    initialValues={{
                        link: '',
                        techName: '',
                        relevantAt: '',
                        lastVersion: '',
                        comment: '',
                    }}
                    validationSchema={validSchema}
                    onSubmit={(values: ValuesTechModal, { setSubmitting }: FormikHelpers<ValuesTechModal>) => {
                        dispatch(createNewTech({ id: values.techName, ...values }));
                        dispatch(setTechCreateModalOpen(false));
                        setSubmitting(false);
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form className="form auth-form">
                            <TextInputOutlined
                                label="Название"
                                name="techName"
                                placeholder="Введите название раздела"
                            />
                            <TextInputOutlined
                                label="Документация"
                                name="link"
                                placeholder="Введите название раздела"
                            />
                            <TextInputOutlined
                                label="Актуальность"
                                name="relevantAt"
                                placeholder="Введите название раздела"
                            />
                            <TextInputOutlined
                                label="Текущая версия"
                                name="lastVersion"
                                placeholder="Введите название раздела"
                            />
                            <TextInputOutlined
                                label="Комментарий"
                                name="comment"
                                placeholder="Введите название раздела"
                            />
                            <Button
                                disabled={isSubmitting}
                                type="submit"
                                variant="contained"
                                color="success"
                                sx={{ marginTop: '20px' }}
                            >
                                Создать
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Modal>
    );
};

export default MyTechCreateModal;