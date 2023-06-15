import { FC, useCallback, useMemo } from 'react';
import { Button, SxProps } from '@mui/material';
import { Form, Formik, FormikHelpers } from 'formik';

import { useUpdateBlipEventCommentMutation } from '../../../../api/companyRadarsApi';
import { updateBlipEventComment } from '../../../../store/editRadarSlice';
import { useAppDispatch } from '../../../../store/hooks';
import ModalTextField from '../ModalTextField';

import styles from '../modal.module.less';

type Props = {
    blipEventId: number;
    comment: string;
    closeFormCallback: () => void;
};

const style: Record<string, SxProps> = {
    btn: { width: 140 },
};

interface Values {
    comment: string;
}

const EditCommentForm: FC<Props> = ({ blipEventId, comment, closeFormCallback }) => {
    const dispatch = useAppDispatch();

    const [updateComment] = useUpdateBlipEventCommentMutation();

    const initialValues = useMemo(
        () => ({
            comment,
        }),
        [comment]
    );

    const submitHandler = useCallback(
        (values: Values, { setSubmitting }: FormikHelpers<Values>) => {
            const updateCommentRequest = { id: blipEventId, comment: values.comment.trim() };

            updateComment(updateCommentRequest)
                .unwrap()
                .then((response) => {
                    dispatch(updateBlipEventComment(response.comment));
                })
                .then(closeFormCallback)
                .catch((error) => {
                    console.error(error);
                });
            setSubmitting(false);
        },
        [dispatch, blipEventId, updateComment, closeFormCallback]
    );

    const closeBtnHandler = useCallback(() => {
        closeFormCallback();
    }, [closeFormCallback]);

    const form = useMemo(
        () =>
            ({ dirty, isValid }: { dirty: boolean; isValid: boolean }) =>
                (
                    <Form>
                        <ModalTextField name={'comment'} multiline={true} />

                        <div className={styles.buttonContainer}>
                            <Button
                                sx={style.btn}
                                color="success"
                                variant="contained"
                                type="submit"
                                disabled={!dirty || !isValid}
                            >
                                Сохранить
                            </Button>
                            <Button sx={style.btn} variant="outlined" onClick={closeBtnHandler}>
                                Отмена
                            </Button>
                        </div>
                    </Form>
                ),
        [closeBtnHandler]
    );

    return (
        <>
            <Formik initialValues={initialValues} onSubmit={submitHandler}>
                {form}
            </Formik>
        </>
    );
};

export default EditCommentForm;
