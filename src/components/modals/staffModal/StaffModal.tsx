import { FC, useCallback } from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import {
    Modal,
    Box,
    Typography,
    Button,
    SxProps,
    IconButton,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    Alert,
} from '@mui/material';

import { useGetStaffQuery } from '../../../api/companiesApi';
import { setDeleteStaffItemModalOpen, setSetStaffItemModalOpen, setStaffModalOpen } from '../../../store/companySlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import DeleteStaffItemModal from './deleteStaffItemModal/DeleteStaffItemModal';
import SetStaffItemModal from './setStaffItemModal/SetStaffItemModal';

type Error = {
    data: {
        message: string;
        status: string;
        timestamp: string;
        type: string;
    };
    status: number;
};

export const styles: Record<string, SxProps> = {
    btn: { marginTop: '10px' },
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
    list: { maxHeight: '400px', overflowY: 'auto', marginTop: '10px' },
};

const StaffModal: FC = () => {
    const dispatch = useAppDispatch();
    const showStaffModal = useAppSelector((state) => state.company.showStaffModal);
    const currentCompany = useAppSelector((state) => state.company.currentCompany);
    const currentCompanyId = currentCompany ? currentCompany.id : 0;

    const { data: staffList, error, isError } = useGetStaffQuery(currentCompanyId);

    const handleClose = useCallback(() => dispatch(setStaffModalOpen(false)), [dispatch]);

    const handleClick = useCallback(() => dispatch(setSetStaffItemModalOpen(true)), [dispatch]);

    const staffTitle = currentCompany ? `Сотрудники компании ${currentCompany.name}` : `Сотрудники компании`;

    return (
        <>
            <Modal
                open={showStaffModal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={styles.modal}>
                    <Typography id="transition-modal-title" variant="h6" component="h2">
                        {staffTitle}
                    </Typography>
                    <List dense={false} sx={styles.list}>
                        {staffList ? (
                            staffList.map((staffItem) => (
                                <ListItem key={staffItem.id}>
                                    <ListItemText primary={staffItem.username} />
                                    <ListItemSecondaryAction>
                                        <IconButton
                                            edge="end"
                                            aria-label="delete"
                                            onClick={() =>
                                                dispatch(
                                                    setDeleteStaffItemModalOpen({ show: true, username: staffItem })
                                                )
                                            }
                                        >
                                            <ClearIcon />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ))
                        ) : (
                            <></>
                        )}
                    </List>
                    <Button type="submit" variant="contained" color="success" sx={styles.btn} onClick={handleClick}>
                        Добавить сотрудника
                    </Button>
                    {isError && <Alert severity="error">{(error as Error).data.message}</Alert>}
                </Box>
            </Modal>
            <SetStaffItemModal />
            <DeleteStaffItemModal />
        </>
    );
};

export default StaffModal;
