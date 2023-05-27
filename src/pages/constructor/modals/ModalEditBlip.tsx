import { FC, useCallback } from 'react';
import { Button, Modal } from '@mui/material';
import { Form, Formik } from 'formik';

import { getRingNames, getSectorNames } from '../../../components/radar/utils';
import { closeEditBlipModal, editBlip } from '../../../store/editRadarSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import ModalSelectField from './ModalSelectField';
import ModalTextField from './ModalTextField';

import styles from './modal.module.less';

const style = {
    btnSx: { width: 140 },
};

const ModalEditBlip: FC = () => {
    const radar = useAppSelector((state) => state.editRadar.radar);

    const blip = useAppSelector((state) => state.editRadar.editingBlip);

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
                        sectorName: blip?.sector.name || '',
                        ringName: blip?.ring.name || '',
                        description: blip?.description || '',
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        dispatch(
                            editBlip({
                                id: blip?.id || -1,
                                label: blip?.label || -1,
                                name: blip?.name || '',
                                ring: radar.rings.find((ring) => ring.name === values.ringName) || { id: -1, name: '' },
                                sector: radar.sectors.find((sector) => sector.name === values.sectorName) || {
                                    id: -1,
                                    name: '',
                                },
                                description: values.description || null,
                            })
                        );

                        setSubmitting(false);
                    }}
                >
                    {({ isValid, dirty }) => (
                        <Form>
                            <ModalSelectField label={'Сектор'} name={'sectorName'} values={getSectorNames(radar)} />
                            <ModalSelectField label={'Кольцо'} name={'ringName'} values={getRingNames(radar)} />
                            <ModalTextField label={'Комментарий'} name={'description'} multiline={true} />
                            <div className={styles.buttonContainer}>
                                <Button
                                    sx={style.btnSx}
                                    color="success"
                                    variant="contained"
                                    type="submit"
                                    disabled={!isValid || !dirty}
                                >
                                    Применить
                                </Button>
                                <Button sx={style.btnSx} variant="outlined" onClick={cancelBtnClickHandler}>
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
