import { FC, useCallback, useMemo } from 'react';
import { Button, LinearProgress, Modal } from '@mui/material';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

import { Blip, RadarInterface } from '../../../components/radar/types';
import { getRingByName, getRingNames, getSectorByName, getSectorNames } from '../../../components/radar/utils';
import { ConstructorMode, addNewBlip, closeCreateBlipModal } from '../../../store/editRadarSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { OperationType, useOperationHandler } from '../hooks';
import ModalSelectField from './ModalSelectField';
import ModalTextField from './ModalTextField';

import styles from './modal.module.less';

const style = { btnSx: { width: 140 } };

interface FieldValues {
    name: string;
    sectorName: string;
    ringName: string;
    description: string;
}

const getValidationSchema = (radar: RadarInterface) => {
    const blipNames = radar.blips.map((blip) => blip.name.toLowerCase());

    return Yup.object({
        name: Yup.string()
            .trim()
            .lowercase()
            .required('Обязательное поле')
            .notOneOf(blipNames, 'Такая технология уже есть на радаре'),
    });
};

const ModalAddNewBlip: FC = () => {
    const radar = useAppSelector((state) => state.editRadar.radar);

    const mode = useAppSelector((state) => state.editRadar.mode);

    const isNewRadar = mode === ConstructorMode.NewRadarCreation;

    const activeSegment = useAppSelector((state) => state.editRadar.activeSegment);

    const dispatch = useAppDispatch();

    const [{ isLoading }, add] = useOperationHandler(OperationType.Add);

    const initialValues = useMemo(
        () => ({
            name: '',
            sectorName: activeSegment?.sector.name as string,
            ringName: activeSegment?.ring.name as string,
            description: '',
        }),
        [activeSegment]
    );

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
                await add(blip, '');
                dispatch(closeCreateBlipModal());
            } else {
                dispatch(addNewBlip(blip));
            }
        },
        [radar, dispatch, isNewRadar, add]
    );

    const cancelBtnClickHandler = useCallback(() => {
        dispatch(closeCreateBlipModal());
    }, [dispatch]);

    return (
        <Modal open={true}>
            <div className={styles.modal}>
                <h3 className={styles.header}>Создать технологию</h3>
                <Formik
                    initialValues={initialValues}
                    validationSchema={getValidationSchema(radar)}
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
                                    sx={style.btnSx}
                                    color="success"
                                    variant="contained"
                                    type="submit"
                                    disabled={!isValid || !dirty || isLoading}
                                >
                                    Создать
                                </Button>
                                <Button sx={style.btnSx} variant="outlined" onClick={cancelBtnClickHandler}>
                                    Отмена
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
                {isLoading && <LinearProgress className={styles.bar} />}
            </div>
        </Modal>
    );
};

export default ModalAddNewBlip;
