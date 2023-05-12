import { FC, useCallback } from 'react';
import { Button, Modal } from '@mui/material';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

import { addNewBlip, closeCreateBlipModal } from '../../../store/editRadarSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import ModalSelectField from './ModalSelectField';
import ModalTextField from './ModalTextField';

import styles from './modal.module.less';

const btnSx = { width: 140 };

const validationSchema = Yup.object({
    name: Yup.string().trim().required('Обязательное поле'),
});

const ModalCreateBlip: FC = () => {
    const sectorNames = useAppSelector((state) => state.editRadar.sectorNames);
    const ringNames = useAppSelector((state) => state.editRadar.ringNames);

    const activeSegment = useAppSelector((state) => state.editRadar.activeSegment);

    const dispatch = useAppDispatch();

    const cancelBtnClickHandler = useCallback(() => {
        dispatch(closeCreateBlipModal());
    }, [dispatch]);

    return (
        <Modal open={true}>
            <div className={styles.modal}>
                <h3 className={styles.header}>Создать технологию</h3>
                <Formik
                    initialValues={{
                        name: '',
                        sectorName: activeSegment?.sectorName || '',
                        ringName: activeSegment?.ringName || '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        dispatch(
                            addNewBlip({
                                id: -1,
                                name: values.name,
                                ringName: values.ringName,
                                sectorName: values.sectorName,
                                description: null,
                            })
                        );
                        setSubmitting(false);
                    }}
                >
                    {({ isValid, dirty }) => (
                        <Form>
                            <ModalTextField label={'Технология'} name={'name'} />
                            <ModalSelectField label={'Сектор'} name={'sectorName'} values={sectorNames} />
                            <ModalSelectField label={'Кольцо'} name={'ringName'} values={ringNames} />
                            <div className={styles.buttonContainer}>
                                <Button
                                    sx={btnSx}
                                    color="success"
                                    variant="contained"
                                    type="submit"
                                    disabled={!isValid || !dirty}
                                >
                                    Создать
                                </Button>
                                <Button sx={btnSx} variant="outlined" onClick={cancelBtnClickHandler}>
                                    Отмена
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </Modal>
    );
};

export default ModalCreateBlip;
