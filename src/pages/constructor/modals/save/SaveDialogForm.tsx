import { FC, ReactNode, useCallback, useEffect, useState } from 'react';
import { Button, LinearProgress, Stack } from '@mui/material';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

import {
    ConstructorMode,
    setEditMode,
    setRadarName,
    setRadarVersion,
    setShowSaveRadarDialog,
} from '../../../../store/editRadarSlice';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import ModalTextField from '../ModalTextField';
import SaveRadarFormObserver from './SaveRadarFormObserver';

import styles from '../modal.module.less';

const style = {
    stack: { mt: 2 },
};
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

    const [initialRadarName] = useState(radarName);
    const [initialRadarVersion] = useState(radarVersion);

    const dispatch = useAppDispatch();

    const cancelBtnClickHandler = useCallback(() => {
        dispatch(setShowSaveRadarDialog(false));
        dispatch(setRadarName(initialRadarName));
        dispatch(setRadarVersion(initialRadarVersion));
    }, [dispatch, initialRadarName, initialRadarVersion]);

    const submitBtnClickHandler = useCallback(async () => {
        await submitHandler();
    }, [submitHandler]);

    const isNewRadarCreation = radarName !== initialRadarName;
    const isVersionEditing = radarName === initialRadarName && radarVersion === initialRadarVersion;
    const isNewVersionCreation = radarName === initialRadarName && radarVersion !== initialRadarVersion;

    let message: ReactNode;
    let buttonLabel: string;

    if (isNewRadarCreation) {
        message = <>Будет создан новый радар.</>;
        buttonLabel = 'Создать радар';
    }

    if (isVersionEditing) {
        message = (
            <>
                Версия <span>{radarVersion}</span> будет изменена.
            </>
        );
        buttonLabel = 'Сохранить изменения';
    }
    if (isNewVersionCreation) {
        message = (
            <>
                Будет создана новая версия радара <span>{radarName}</span>.
            </>
        );
        buttonLabel = 'Создать версию';
    }

    useEffect(() => {
        if (isNewRadarCreation) dispatch(setEditMode(ConstructorMode.NewRadarCreation));
        if (isVersionEditing) dispatch(setEditMode(ConstructorMode.VersionEditing));
        if (isNewVersionCreation) dispatch(setEditMode(ConstructorMode.NewVersionCreation));
    }, [isNewRadarCreation, isVersionEditing, isNewVersionCreation, dispatch]);

    return (
        <>
            <h3 className={styles.header}>Сохранить радар</h3>
            {message && <div className={styles.message}>{message}</div>}
            <Formik
                initialValues={{
                    name: radarName || '',
                    version: radarVersion || '',
                }}
                validationSchema={validationSchema}
                onSubmit={async (_values, { setSubmitting }) => {
                    await submitBtnClickHandler();
                    setSubmitting(false);
                }}
            >
                {({ isValid }) => {
                    return (
                        <>
                            <Form>
                                <ModalTextField label={'Название радара'} name={'name'} disabled={isLoading} />
                                <ModalTextField label={'Версия'} name={'version'} disabled={isLoading} />
                                <Stack spacing={2} sx={style.stack}>
                                    <Button variant="contained" type="submit" disabled={!isValid || isLoading}>
                                        {buttonLabel}
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
