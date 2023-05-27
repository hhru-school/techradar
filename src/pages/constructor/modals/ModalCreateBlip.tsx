import { FC, useCallback } from 'react';
import { Button, Modal } from '@mui/material';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

import { useAddNewBlipToRadarMutation } from '../../../api/companyRadarsApi';
import { Blip } from '../../../components/radar/types';
import { getRingByName, getRingNames, getSectorByName, getSectorNames } from '../../../components/radar/utils';
import { ConstructorMode, addNewBlip, closeCreateBlipModal } from '../../../store/editRadarSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import ModalSelectField from './ModalSelectField';
import ModalTextField from './ModalTextField';

import styles from './modal.module.less';

const btnSx = { width: 140 };

interface FieldValues {
    name: string;
    sectorName: string;
    ringName: string;
    description: string;
}

const validationSchema = Yup.object({
    name: Yup.string().trim().required('Обязательное поле'),
});

const ModalCreateBlip: FC = () => {
    const radar = useAppSelector((state) => state.editRadar.radar);

    const mode = useAppSelector((state) => state.editRadar.mode);

    const isNewRadar = mode === ConstructorMode.NewRadarCreation;

    const activeSegment = useAppSelector((state) => state.editRadar.activeSegment);

    const [addNewBlipEvent] = useAddNewBlipToRadarMutation();

    const dispatch = useAppDispatch();

    const submitHandler = useCallback(
        async (values: FieldValues) => {
            const blip: Blip = {
                id: -1,
                label: -1,
                name: values.name,
                ring: getRingByName(radar, values.ringName),
                sector: getSectorByName(radar, values.sectorName),
                description: values.description,
            };

            if (!isNewRadar) {
                await addNewBlipEvent(blip);
            }

            dispatch(addNewBlip(blip));
        },
        [radar, dispatch, isNewRadar, addNewBlipEvent]
    );

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
                        sectorName: activeSegment?.sector.name as string,
                        ringName: activeSegment?.ring.name as string,
                        description: '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={async (values, { setSubmitting }) => {
                        await submitHandler(values);
                        setSubmitting(false);
                    }}
                >
                    {({ isValid, dirty }) => (
                        <Form>
                            <ModalTextField label={'Технология'} name={'name'} />
                            <ModalSelectField label={'Сектор'} name={'sectorName'} values={getSectorNames(radar)} />
                            <ModalSelectField label={'Кольцо'} name={'ringName'} values={getRingNames(radar)} />
                            <ModalTextField label={'Комментарий'} name={'description'} multiline={true} />
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
