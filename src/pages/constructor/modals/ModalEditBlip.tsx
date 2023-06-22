import { FC, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowForward } from '@mui/icons-material';
import { Button, Modal, Stack } from '@mui/material';

import { closeEditBlipModal } from '../../../store/editRadarSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';

import styles from './modal.module.less';

const style = {
    stack: { mt: 4 },
};

const ModalEditBlip: FC = () => {
    const editingBlip = useAppSelector((state) => state.editRadar.editingBlip);

    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const cancelBtnHandler = useCallback(() => {
        dispatch(closeEditBlipModal());
    }, [dispatch]);

    const linkBtnHandler = useCallback(() => {
        if (editingBlip) {
            navigate(`/tech/${editingBlip?.id}`);
        }
    }, [navigate, editingBlip]);

    return (
        <Modal open={true}>
            <div className={styles.modal}>
                <h3 className={styles.header}>
                    Редактирование технологии <br />
                    <span>{editingBlip?.name}</span>
                </h3>
                <div className={styles.message}>Перейти на страницу технологии?</div>
                <Stack spacing={2} sx={style.stack}>
                    <Button fullWidth={true} endIcon={<ArrowForward />} variant="contained" onClick={linkBtnHandler}>
                        К странице технологии
                    </Button>
                    <Button fullWidth={true} variant="outlined" onClick={cancelBtnHandler}>
                        Остаться в конструкторе
                    </Button>
                </Stack>
            </div>
        </Modal>
    );
};

export default ModalEditBlip;
