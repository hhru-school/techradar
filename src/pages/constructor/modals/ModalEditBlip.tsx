import { FC, useCallback } from 'react';
import { Button, Modal } from '@mui/material';
import { Form, Formik } from 'formik';

import { closeEditBlipModal, editBlip } from '../../../store/editRadarSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import ModalSelectField from './ModalSelectField';
import ModalTextField from './ModalTextField';

import styles from './modal.module.less';

const btnSx = { width: 140 };

const ModalEditBlip: FC = () => {
    const sectorNames = useAppSelector((state) => state.editRadar.sectorNames);
    const ringNames = useAppSelector((state) => state.editRadar.ringNames);

    const blip = useAppSelector((state) => state.editRadar.blip);

    const dispatch = useAppDispatch();

    const cancelBtnClickHandler = useCallback(() => {
        dispatch(closeEditBlipModal());
    }, [dispatch]);

    return (
        <Modal open={true}>
            <div className={styles.modal}>
                <h3 className={styles.header}>
                    Редактирование технологии <br />
                    <span>{blip?.name}</span>
                </h3>
                <Formik
                    initialValues={{
                        sectorName: blip?.sectorName || '',
                        ringName: blip?.ringName || '',
                        description: blip?.description || '',
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        dispatch(
                            editBlip({
                                id: blip?.id || -1,
                                name: blip?.name || '',
                                ringName: values.ringName,
                                sectorName: values.sectorName,
                                description: values.description || null,
                            })
                        );
                        setSubmitting(false);
                    }}
                >
                    {({ isValid, dirty }) => (
                        <Form>
                            <ModalSelectField label={'Сектор'} name={'sectorName'} values={sectorNames} />
                            <ModalSelectField label={'Кольцо'} name={'ringName'} values={ringNames} />
                            <ModalTextField label={'Комментарий'} name={'description'} multiline={true} />
                            <div className={styles.buttonContainer}>
                                <Button
                                    sx={btnSx}
                                    color="success"
                                    variant="contained"
                                    type="submit"
                                    disabled={!isValid || !dirty}
                                >
                                    Применить
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

export default ModalEditBlip;
