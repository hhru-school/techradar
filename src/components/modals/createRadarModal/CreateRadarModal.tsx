import { FC, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Backdrop, Box, Button, Fade, Modal, SxProps, Typography } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setCreateRadarModalOpen } from '../../../store/myRadarsSlice';
import DragDropFile from './dragDropFile/DragDropFile';

export const styles: Record<string, SxProps> = {
    btn: { marginTop: '20px' },
    linkRegistr: { mt: 3 },
    progressCircle: { height: '100%' },
    modal: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        minWidth: 250,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
};

const CreateRadarInConstructorBtn: FC = () => {
    const navigate = useNavigate();
    const handleCreateRadar = useCallback(() => {
        navigate('/constructor/new/radar');
    }, [navigate]);

    return (
        <Button onClick={handleCreateRadar} variant="contained" sx={styles.btn}>
            В конструкторе
        </Button>
    );
};

const slots = { backdrop: Backdrop };

const slotProps = {
    backdrop: {
        timeout: 500,
    },
};

const CreateRadarModal: FC = () => {
    const dispatch = useAppDispatch();
    const showCreateRadarModal = useAppSelector((state) => state.myRadars.showCreateRadarModal);

    const handleClose = useCallback(() => {
        dispatch(setCreateRadarModalOpen(false));
    }, [dispatch]);

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={showCreateRadarModal}
            onClose={handleClose}
            closeAfterTransition
            slots={slots}
            slotProps={slotProps}
        >
            <Fade in={showCreateRadarModal}>
                <Box sx={styles.modal}>
                    <Typography variant="h6" component="h2" align="center">
                        Как Вы хотите создать радар?
                    </Typography>

                    <CreateRadarInConstructorBtn />

                    <DragDropFile />
                </Box>
            </Fade>
        </Modal>
    );
};

export default CreateRadarModal;
