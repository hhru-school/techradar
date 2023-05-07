import { FC } from 'react';
import { Button, Modal } from '@mui/material';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

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

const mock = ['aaa', 'bbb', 'ccc'];

const ModalCreateBlip: FC<Props> = ({ open }) => {
    return (
        <Modal open={open}>
            <div className={styles.modal}>
                <h3 className={styles.header}>Add new technology</h3>
                <Formik
                    initialValues={{
                        name: '',
                        sectorName: mock[1],
                        ringName: mock[0],
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        setTimeout(() => {
                            setSubmitting(false);
                        }, 1000);
                    }}
                >
                    <Form>
                        <ModalTextField label={'Technology name'} name={'name'} />
                        <ModalSelectField label={'Sector name'} name={'sectorName'} values={mock} />
                        <ModalSelectField label={'Ring name'} name={'ringName'} values={mock} />
                        <div className={styles.buttonContainer}>
                            <Button sx={btnSx} color="success" variant="contained" type="submit">
                                Add
                            </Button>
                            <Button sx={btnSx} variant="outlined">
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
