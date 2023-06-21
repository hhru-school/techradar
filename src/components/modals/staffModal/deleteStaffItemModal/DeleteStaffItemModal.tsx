import { FC, useCallback, useState } from 'react';
import { Alert, Box, Button, CircularProgress, Modal, SxProps, Typography } from '@mui/material';

import { useDeleteStaffItemMutation } from '../../../../api/companiesApi';
import { setDeleteStaffItemModalOpen } from '../../../../store/companySlice';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';

const styles: Record<string, SxProps> = {
    btn: { marginTop: '20px', width: '200px' },
    progressCircle: { height: '100%' },
    modal: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '250px',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
};

const DeleteStaffItemModal: FC = () => {
    const dispatch = useAppDispatch();
    const showDeleteStaffItemModal = useAppSelector((state) => state.company.showDeleteStaffItemModal);
    const deleteStaffItemData = useAppSelector((state) => state.company.deleteStaffItemData);
    const currentCompany = useAppSelector((state) => state.company.currentCompany);
    const [errMessage, setErrMessage] = useState<string | null>(null);
    const [deleteStaffItem, { isLoading }] = useDeleteStaffItemMutation();

    const handleClose = useCallback(
        () => dispatch(setDeleteStaffItemModalOpen({ show: false, username: null })),
        [dispatch]
    );

    const handleClick = useCallback(async () => {
        if (currentCompany && deleteStaffItemData) {
            await deleteStaffItem({ username: deleteStaffItemData.username, companyId: currentCompany.id })
                .unwrap()
                .then(() => {
                    setErrMessage(null);
                    dispatch(setDeleteStaffItemModalOpen({ show: false, username: null }));
                })
                .catch((err: Error) => {
                    setErrMessage(err.message);
                });
        }
    }, [currentCompany, deleteStaffItem, deleteStaffItemData, dispatch]);

    const textCreateVersionBtn = isLoading ? (
        <CircularProgress color="inherit" sx={styles.progressCircle} />
    ) : (
        'Удалить'
    );

    const title = deleteStaffItemData
        ? `Действительно хотите удалить сотрудника ${deleteStaffItemData.username}?`
        : `Действительно хотите удалить сотрудника?`;

    return (
        <Modal
            open={showDeleteStaffItemModal}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={styles.modal}>
                <Typography id="transition-modal-title" variant="h6" component="h2" align="center">
                    {title}
                </Typography>

                <Button
                    disabled={isLoading}
                    type="submit"
                    variant="contained"
                    color="error"
                    sx={styles.btn}
                    onClick={handleClick}
                >
                    {textCreateVersionBtn}
                </Button>
                <Button type="button" variant="outlined" sx={styles.btn} onClick={handleClose}>
                    отмена
                </Button>
                {errMessage && <Alert severity="error">{errMessage}</Alert>}
            </Box>
        </Modal>
    );
};

export default DeleteStaffItemModal;
