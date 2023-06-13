import { FC, useCallback, useState } from 'react';
import { Alert, Box, Button, Modal, SxProps, Typography } from '@mui/material';

import { useDeleteRadarVersionMutation } from '../../../../api/radarsGridApi';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { setConfirmDeleteVesionModal } from '../../../../store/myRadarsSlice';

const styles: Record<string, SxProps> = {
    btnSuccess: { marginTop: '20px' },
    modal: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 300,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    },
    error: { marginTop: '10px' },
};

type ErrorResponse = {
    data: {
        message: string;
        status: string;
        timestamp: string;
        type: string;
    };
    status: number;
};

const DeleteVersionDialog: FC = () => {
    const dispatch = useAppDispatch();
    const showConfirmDeleteVesionModal = useAppSelector((state) => state.myRadars.showConfirmDeleteVesionModal);
    const deleteGridVersionData = useAppSelector((state) => state.myRadars.deleteGridVersionData);
    const [deleteRadarVersion, { isLoading }] = useDeleteRadarVersionMutation();
    const [errMessage, setErrMessage] = useState<string | null>(null);

    const titleModal = deleteGridVersionData && `Действительно хотите удалить версию ${deleteGridVersionData.name}?`;

    const handleClose = useCallback(() => {
        dispatch(setConfirmDeleteVesionModal({ show: false, data: null }));
        setErrMessage(null);
    }, [dispatch]);

    const handleClickDelete = useCallback(async () => {
        if (deleteGridVersionData) {
            await deleteRadarVersion(deleteGridVersionData.id)
                .unwrap()
                .then(() => {
                    setErrMessage(null);
                    dispatch(setConfirmDeleteVesionModal({ show: false, data: null }));
                })
                .catch((e: ErrorResponse) => setErrMessage(e.data.message));
        }
    }, [deleteGridVersionData, deleteRadarVersion, dispatch]);

    return (
        <Modal
            open={showConfirmDeleteVesionModal}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={styles.modal}>
                <Typography id="transition-modal-title" variant="h6" align="center" component="h2">
                    {titleModal}
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button
                        disabled={isLoading}
                        type="submit"
                        variant="contained"
                        color="success"
                        sx={styles.btnSuccess}
                        onClick={handleClickDelete}
                    >
                        Удалить
                    </Button>
                    <Button
                        disabled={isLoading}
                        type="submit"
                        variant="contained"
                        color="error"
                        sx={styles.btnSuccess}
                        onClick={handleClose}
                    >
                        Отмена
                    </Button>
                </Box>
                {errMessage && (
                    <Alert sx={styles.error} severity="error">
                        {errMessage}
                    </Alert>
                )}
            </Box>
        </Modal>
    );
};

export default DeleteVersionDialog;
