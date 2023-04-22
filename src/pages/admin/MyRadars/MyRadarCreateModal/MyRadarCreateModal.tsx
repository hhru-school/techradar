import { FC, useCallback } from 'react';
import { Box, Button, Modal, Typography, TextField } from '@mui/material';
import { Formik, FormikHelpers, Form, useField, FieldHookConfig } from 'formik';
import * as Yup from 'yup';

import { styleModal } from '../../../../components/AuthFormModal/AuthFormModal';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { createNewRadarSection, setRadarsCreateModalOpen } from '../../../../store/myRadarsSlice';

export interface Values {
    name: string;
}

type PropsInput = {
    label: string;
    placeholder: string;
};

const MyTextInput = ({ ...props }) => {
    const [field, meta] = useField<FieldHookConfig<PropsInput>>({ ...props, name: 'name' });
    return (
        <>
            <TextField
                {...props}
                {...field}
                sx={{ marginTop: '20px' }}
                variant="outlined"
                id="outlined-basic"
                type="text"
                name="name"
            />
            {meta.touched && meta.error ? <div className="error">{meta.error}</div> : null}
        </>
    );
};

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
                        dispatch(createNewRadarSection(values.name));
                        dispatch(setRadarsCreateModalOpen(false));
                        setSubmitting(false);
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form className="form auth-form">
                            <MyTextInput label="Название" placeholder="Введите название раздела" />
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
