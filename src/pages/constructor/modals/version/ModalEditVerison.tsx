import { FC, useCallback } from 'react';
import { Delete } from '@mui/icons-material';
import { Alert, Button, IconButton, Modal, SxProps } from '@mui/material';

import {
    openEditVersionNameModal,
    setShowDeleteVersionModal,
    setShowEditVersionModal,
    setShowSwitchReleaseModal,
} from '../../../../store/editRadarSlice';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import CloseButton from '../CloseButton';

import styles from '../modal.module.less';
import contentStyles from './editVersion.module.less';

const btnStyle: Record<string, SxProps> = { small: { width: 120 }, large: { height: 40 } };

const warningMessage = 'Публикация не возможна, т.к. у родителя этой версии уже есть опубликованный наследник.';

const ModalEditVersion: FC = () => {
    const version = useAppSelector((state) => state.editRadar.version);
    const dispatch = useAppDispatch();

    const closeHandler = useCallback(() => {
        dispatch(setShowEditVersionModal(false));
    }, [dispatch]);

    const deleteBtnHandler = useCallback(() => {
        dispatch(setShowDeleteVersionModal(true));
    }, [dispatch]);

    const editNameHandler = useCallback(() => {
        dispatch(openEditVersionNameModal());
    }, [dispatch]);

    const isReleased = version?.release;

    const toggleReleaseClickHandler = useCallback(() => {
        dispatch(setShowSwitchReleaseModal(true));
    }, [dispatch]);

    return (
        <Modal open={true}>
            <div className={styles.modal}>
                <CloseButton closeHandler={closeHandler} />
                <h3 className={styles.header}>
                    Редактирование версии
                    <br /> <span>{version.name}</span>
                </h3>
                <div className={contentStyles.btnContainer}>
                    <Button variant="outlined" size="small" onClick={editNameHandler} sx={btnStyle.large}>
                        Изменить название
                    </Button>

                    {isReleased ? (
                        <Button
                            color="error"
                            variant="outlined"
                            onClick={toggleReleaseClickHandler}
                            sx={btnStyle.large}
                        >
                            Снять с публикации
                        </Button>
                    ) : (
                        <Button
                            color="success"
                            variant="contained"
                            onClick={toggleReleaseClickHandler}
                            sx={btnStyle.large}
                            disabled={!version.toggleAvailable}
                        >
                            Опубликовать
                        </Button>
                    )}
                </div>
                {!version.toggleAvailable && <Alert severity="warning">{warningMessage}</Alert>}
                <div className={contentStyles.footer}>
                    <div>Удаление версии</div>
                    <IconButton color="error" onClick={deleteBtnHandler}>
                        <Delete />
                    </IconButton>
                </div>
            </div>
        </Modal>
    );
};

export default ModalEditVersion;
