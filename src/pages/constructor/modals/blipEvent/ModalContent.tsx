import { FC, useCallback, useState } from 'react';
import { Edit } from '@mui/icons-material';
import { Button, IconButton } from '@mui/material';

import { IndexBlipEventApi } from '../../../../api/types';
import { openDeleteBlipEventModal } from '../../../../store/editRadarSlice';
import { useAppDispatch } from '../../../../store/hooks';
import CommentField from './CommentField';
import EditCommentForm from './EditCommentForm';

import styles from './blipEventModal.module.less';

type Props = {
    blipEvent: IndexBlipEventApi;
};

const ModalContent: FC<Props> = ({ blipEvent }) => {
    const dispatch = useAppDispatch();

    const [showForm, setShowForm] = useState(false);

    const editBtnHandler = useCallback(() => {
        setShowForm(true);
    }, [setShowForm]);

    const deleteBtnHandler = useCallback(() => {
        dispatch(openDeleteBlipEventModal());
    }, [dispatch]);

    const closeFormHandler = useCallback(() => {
        setShowForm(false);
    }, [setShowForm]);

    return (
        <>
            <div className={styles.commentHeader}>
                <h4>Комментарий</h4>
                {!showForm && (
                    <IconButton onClick={editBtnHandler} size="small">
                        <Edit fontSize="small" />
                    </IconButton>
                )}
            </div>
            {showForm ? (
                <EditCommentForm
                    blipEventId={blipEvent.id}
                    comment={blipEvent.comment || ''}
                    closeFormCallback={closeFormHandler}
                />
            ) : (
                <CommentField comment={blipEvent.comment} />
            )}
            {!showForm && (
                <div className={styles.footer}>
                    <div>Удаление события из лога</div>
                    <Button color="error" variant="contained" size="small" onClick={deleteBtnHandler}>
                        Удалить
                    </Button>
                </div>
            )}
        </>
    );
};

export default ModalContent;
