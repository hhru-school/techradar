import { FC, useCallback, useRef } from 'react';
import { Button, Modal } from '@mui/material';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

import { setRadarName, setRadarVersion, setShowSaveRadarDialog } from '../../../store/editRadarSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import ModalTextField from './ModalTextField';
import SaveRadarFormObserver from './SaveRadarFormObserver';

import styles from './modal.module.less';

const btnSx = { width: 140 };

const validationSchema = Yup.object({
    name: Yup.string().trim().required('Обязательное поле'),
    version: Yup.string().trim().required('Обязательное поле'),
});

const ModalSaveDialog: FC = () => {
    const radarName = useAppSelector((state) => state.editRadar.radarName);
    const radarVersion = useAppSelector((state) => state.editRadar.radarVersion);

    const initialRadarName = useRef<string>(radarName);
    const initialRadarVersion = useRef<string>(radarVersion);

    const dispatch = useAppDispatch();

    const cancelBtnClickHandler = useCallback(() => {
        dispatch(setShowSaveRadarDialog(false));
        dispatch(setRadarName(initialRadarName.current));
        dispatch(setRadarVersion(initialRadarVersion.current));
    }, [dispatch]);

    // const confirmBtnClickHandler = useCallback(() => {
    //     dispatch(moveBlip());
    // }, [dispatch]);

    return (
        <Modal open={true}>
            <div className={styles.modal}>
                <h3 className={styles.header}>Сохранить радар</h3>
                <Formik
                    initialValues={{
                        name: radarName || '',
                        version: radarVersion || '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        // dispatch(
                        //     addNewBlip({
                        //         id: -1,
                        //         name: values.name,
                        //         ringName: values.ringName,
                        //         sectorName: values.sectorName,
                        //         description: values.description,
                        //     })
                        // );
                        setSubmitting(false);
                    }}
                >
                    {({ isValid }) => {
                        return (
                            <Form>
                                <ModalTextField label={'Название радара'} name={'name'} />

                                <ModalTextField label={'Версия'} name={'version'} />
                                <div className={styles.buttonContainer}>
                                    <Button sx={btnSx} variant="contained" type="submit" disabled={!isValid}>
                                        Сохранить
                                    </Button>
                                    <Button sx={btnSx} variant="outlined" onClick={cancelBtnClickHandler}>
                                        Отмена
                                    </Button>
                                </div>
                                <SaveRadarFormObserver />
                            </Form>
                        );
                    }}
                </Formik>
            </div>
        </Modal>
    );
};

export default ModalSaveDialog;
