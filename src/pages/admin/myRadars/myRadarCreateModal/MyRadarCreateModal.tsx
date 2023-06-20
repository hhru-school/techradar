import { FC, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Box, Button, CircularProgress, Modal, SxProps, Typography } from '@mui/material';
import { Formik, FormikHelpers, Form } from 'formik';
import * as Yup from 'yup';

import { useCreateNewVersionMutation } from '../../../../api/radarsGridApi';
import { ErrorRes, NewVersionResponse } from '../../../../api/types';
import { styles } from '../../../../components/modals/authFormModal/AuthFormModal';
import TextInputOutlined from '../../../../components/textInputOutlined/TextInputOutlined';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { setCreateVersionModalOpen } from '../../../../store/myRadarsSlice';

export const style: Record<string, SxProps> = {
    btnSuccess: { marginTop: '20px' },
    cancel: { display: 'flex', justifyContent: 'space-between' },
};

export interface Values {
    name: string;
}

const validSchema = Yup.object({
    name: Yup.string().required('Обязательное поле!'),
});

const initialValues = {
    name: '',
};

const MyRadarCreateModal: FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const showRadarsCreateModal = useAppSelector((state) => state.myRadars.showCreateVersionModal);
    const createVersionId = useAppSelector((state) => state.myRadars.createVersionId);
    const [errMessage, setErrMessage] = useState<string | null>(null);
    const [createVersion, { isLoading }] = useCreateNewVersionMutation();
    const radarIdValue = createVersionId || 0;

    const handleClose = useCallback(
        () => dispatch(setCreateVersionModalOpen({ show: false, radarId: null })),
        [dispatch]
    );

    const handleSubmit = useCallback(
        async (values: Values, { setSubmitting }: FormikHelpers<Values>) => {
            await createVersion({ name: values.name, release: false, radarId: radarIdValue })
                .unwrap()
                .then(({ id }: NewVersionResponse) => {
                    setErrMessage(null);
                    navigate(`/constructor/edit/version/${id}`);
                    dispatch(setCreateVersionModalOpen({ show: false, radarId: null }));
                    setSubmitting(false);
                })
                .catch((err: ErrorRes) => {
                    setErrMessage(err.data.message);
                });
        },
        [createVersion, dispatch, navigate, radarIdValue]
    );

    const textCreateVersionBtn = isLoading ? (
        <CircularProgress color="inherit" sx={styles.progressCircle} />
    ) : (
        'Перейти в конструктор'
    );

    return (
        <Modal
            open={showRadarsCreateModal}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={styles.modal}>
                <Typography id="transition-modal-title" variant="h6" component="h2">
                    Введите название для новой версии
                </Typography>
                <Formik initialValues={initialValues} validationSchema={validSchema} onSubmit={handleSubmit}>
                    <Form className="form auth-form">
                        <TextInputOutlined
                            label="Название"
                            type="text"
                            name="name"
                            placeholder="Введите название новой версии"
                            disabled={isLoading}
                        />
                        <Box sx={style.cancel}>
                            <Button
                                disabled={isLoading}
                                type="submit"
                                variant="contained"
                                color="success"
                                sx={styles.btnSuccess}
                            >
                                {textCreateVersionBtn}
                            </Button>
                            <Button
                                disabled={isLoading}
                                type="button"
                                variant="outlined"
                                sx={style.btnSuccess}
                                onClick={handleClose}
                            >
                                отмена
                            </Button>
                        </Box>
                        {errMessage && <Alert severity="error">{errMessage}</Alert>}
                    </Form>
                </Formik>
            </Box>
        </Modal>
    );
};

export default MyRadarCreateModal;
