import { FC, useCallback, useRef } from 'react';
import { Button } from '@mui/material';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

import { setRadarName, setRadarVersion, setShowSaveRadarDialog } from '../../../../store/editRadarSlice';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import ModalTextField from '../ModalTextField';
import SaveRadarFormObserver from './SaveRadarFormObserver';

import styles from '../modal.module.less';

const btnSx = { width: 140 };

const validationSchema = Yup.object({
    name: Yup.string().trim().required('Обязательное поле'),
    version: Yup.string().trim().required('Обязательное поле'),
});

type Props = {
    submitHandler: () => Promise<void>;
    isLoading?: boolean;
};

const SaveDialogForm: FC<Props> = ({ submitHandler, isLoading = false }) => {
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

    const submitBtnClickHandler = useCallback(async () => {
        await submitHandler();
    }, [submitHandler]);

    return (
        <>
            <h3 className={styles.header}>Сохранить радар</h3>

            <Formik
                initialValues={{
                    name: radarName || '',
                    version: radarVersion || '',
                }}
                validationSchema={validationSchema}
                onSubmit={async (values, { setSubmitting }) => {
                    await submitBtnClickHandler();
                    setSubmitting(false);
                }}
            >
                {({ isValid }) => {
                    return (
                        <Form>
                            <ModalTextField label={'Название радара'} name={'name'} />

                            <ModalTextField label={'Версия'} name={'version'} />
                            <div className={styles.buttonContainer}>
                                <Button sx={btnSx} variant="contained" type="submit" disabled={!isValid || isLoading}>
                                    Сохранить
                                </Button>
                                <Button
                                    sx={btnSx}
                                    variant="outlined"
                                    onClick={cancelBtnClickHandler}
                                    disabled={isLoading}
                                >
                                    Отмена
                                </Button>
                            </div>
                            <SaveRadarFormObserver />
                        </Form>
                    );
                }}
            </Formik>
        </>
    );
};

export default SaveDialogForm;
