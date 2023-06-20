import { FC, useCallback, useMemo } from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import { Modal, Box, Typography, Button, SxProps, Alert } from '@mui/material';
import { DataGrid, GridActionsCellItem, ruRU } from '@mui/x-data-grid';

import { CompanyStaff, useGetStaffQuery } from '../../../api/companiesApi';
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
        minWidth: 300,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        minHeight: '400px',
    },
    list: { maxHeight: '400px', overflowY: 'auto', marginTop: '10px' },
    title: { marginBottom: '10px' },
};

const initialState = {
    pagination: {
        paginationModel: {
            pageSize: 8,
        },
    },
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

    const rows = useMemo(() => staffList || [], [staffList]);

    const deleteRow = useCallback(
        (row: CompanyStaff) => dispatch(setDeleteStaffItemModalOpen({ show: true, username: row })),
        [dispatch]
    );
    const deleteStaffItemRow = useCallback(
        (params: { row: CompanyStaff }) => [
            <GridActionsCellItem icon={<ClearIcon />} label="Delete" onClick={() => deleteRow(params.row)} />,
        ],
        [deleteRow]
    );

    const columns = useMemo(
        () => [
            {
                field: 'username',
                headerName: 'Сотрудник',
                type: 'string',
                width: 260,
                editable: false,
            },
            {
                field: 'delete',
                type: 'actions',
                width: 30,
                getActions: deleteStaffItemRow,
            },
        ],
        [deleteStaffItemRow]
    );

    return (
        <>
            <Modal
                open={showStaffModal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={styles.modal}>
                    <Typography id="transition-modal-title" variant="h6" component="h2" sx={styles.title}>
                        {staffTitle}
                    </Typography>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        initialState={initialState}
                        pageSizeOptions={[5]}
                        disableRowSelectionOnClick
                        localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
                    />
                    <Button type="submit" variant="contained" color="success" sx={styles.btn} onClick={handleClick}>
                        Добавить сотрудника
                    </Button>
                    <Button type="button" variant="outlined" sx={styles.btn} onClick={handleClose}>
                        отмена
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
