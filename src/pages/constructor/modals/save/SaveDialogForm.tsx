import { FC, useCallback, useMemo, useState } from 'react';
import { Button, LinearProgress, Stack } from '@mui/material';
import { Form, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';

import { setRadarName, setCurrentRadarVersionName, setShowSaveRadarDialog } from '../../../../store/editRadarSlice';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import ModalTextField from '../ModalTextField';
import SaveRadarFormObserver from './SaveRadarFormObserver';

import styles from '../modal.module.less';

const style = {
    stack: { mt: 2 },
};

interface Values {
    name: string;
    version: string;
}

const validationSchema = Yup.object({
    name: Yup.string().trim().required('Обязательное поле'),
    version: Yup.string().trim().required('Обязательное поле'),
});

type Props = {
    submitHandler: () => Promise<void>;
    isLoading?: boolean;
};

const SaveDialogForm: FC<Props> = ({ submitHandler, isLoading = false }) => {
    const radarName = useAppSelector((state) => state.editRadar.radar.name);
    const radarVersion = useAppSelector((state) => state.editRadar.currentVersionName);

    const [initialRadarName] = useState(radarName);
    const [initialRadarVersion] = useState(radarVersion);

    const dispatch = useAppDispatch();

    const cancelBtnClickHandler = useCallback(() => {
        dispatch(setShowSaveRadarDialog(false));
        dispatch(setRadarName(initialRadarName));
        dispatch(setCurrentRadarVersionName(initialRadarVersion));
    }, [dispatch, initialRadarName, initialRadarVersion]);

    const submitBtnClickHandler = useCallback(
        async (_values: Values, { setSubmitting }: FormikHelpers<Values>) => {
            await submitHandler();
            setSubmitting(false);
        },
        [submitHandler]
    );

    const initialValues = useMemo(
        () => ({
            name: radarName,
            version: radarVersion,
        }),
        [radarName, radarVersion]
    );

    return (
        <>
            <h3 className={styles.header}>Сохранить радар</h3>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={submitBtnClickHandler}>
                {({ isValid }) => {
                    return (
                        <>
                            <Form>
                                <ModalTextField label={'Название радара'} name={'name'} disabled={isLoading} />
                                <ModalTextField label={'Версия'} name={'version'} disabled={isLoading} />
                                <Stack spacing={2} sx={style.stack}>
                                    <Button variant="contained" type="submit" disabled={!isValid || isLoading}>
                                        Сохранить радар
                                    </Button>
                                    <Button variant="outlined" onClick={cancelBtnClickHandler} disabled={isLoading}>
                                        Отмена
                                    </Button>
                                </Stack>
                                <SaveRadarFormObserver />
                            </Form>
                        </>
                    );
                }}
            </Formik>
            {isLoading && <LinearProgress className={styles.bar} />}
        </>
    );
};

export default SaveDialogForm;
