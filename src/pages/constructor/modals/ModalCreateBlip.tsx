import { FC, useCallback } from 'react';
import { Button, Modal } from '@mui/material';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

import { addNewBlip, closeCreateBlipModal } from '../../../store/editRadarSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import ModalSelectField from './ModalSelectField';
import ModalTextField from './ModalTextField';

import styles from './modal.module.less';

type Props = {
    open: boolean;
};

const btnSx = { width: 140 };

const validationSchema = Yup.object({
    name: Yup.string().trim().min(2, 'min').required('Mandatory field'),
});

const ModalCreateBlip: FC<Props> = ({ open }) => {
    const sectorNames = useAppSelector((state) => state.editRadar.sectorNames);
    const ringNames = useAppSelector((state) => state.editRadar.ringNames);

    const activeSegment = useAppSelector((state) => state.editRadar.activeSegment);

    const dispatch = useAppDispatch();

    const cancelBtnClickHandler = useCallback(() => {
        dispatch(closeCreateBlipModal());
    }, [dispatch]);

    return (
        <Modal open={open}>
            <div className={styles.modal}>
                <h3 className={styles.header}>Add new technology</h3>
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
                    <Form>
                        <ModalTextField label={'Technology name'} name={'name'} />
                        <ModalSelectField label={'Sector name'} name={'sectorName'} values={sectorNames} />
                        <ModalSelectField label={'Ring name'} name={'ringName'} values={ringNames} />
                        <div className={styles.buttonContainer}>
                            <Button sx={btnSx} color="success" variant="contained" type="submit">
                                Add
                            </Button>
                            <Button sx={btnSx} variant="outlined" onClick={cancelBtnClickHandler}>
                                Cancel
                            </Button>
                        </div>
                    </Form>
                </Formik>
            </div>
        </Modal>
    );
};

export default ModalCreateBlip;
