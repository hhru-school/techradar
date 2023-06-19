import { FC, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Box, Typography, SxProps } from '@mui/material';
import { DataGrid, ruRU } from '@mui/x-data-grid';

import { CompanyData } from '../../../api/companiesApi';
import { useGetAllCompaniesQuery } from '../../../api/publicCompaniesApi';
import { setCompanyModalOpen } from '../../../store/companySlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';

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
        minHeight: '700px',
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

const CompanyModal: FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const showCompanyModal = useAppSelector((state) => state.company.showCompanyModal);

    const { data: allCompanies } = useGetAllCompaniesQuery();

    const handleClose = useCallback(() => dispatch(setCompanyModalOpen(false)), [dispatch]);

    const rows = useMemo(() => allCompanies || [], [allCompanies]);

    const handleClick = useCallback(
        (params: { row: CompanyData }) => {
            navigate(`/techradar/company/${params.row.id}/radar/1/version/latest`);
            dispatch(setCompanyModalOpen(false));
        },
        [dispatch, navigate]
    );

    const columns = useMemo(
        () => [
            {
                field: 'name',
                headerName: 'Название компании',
                type: 'string',
                width: 260,
                editable: false,
            },
        ],
        []
    );

    return (
        <Modal
            open={showCompanyModal}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={styles.modal}>
                <Typography id="transition-modal-title" variant="h6" component="h2" sx={styles.title} align="center">
                    Компании
                </Typography>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={initialState}
                    pageSizeOptions={[5]}
                    disableRowSelectionOnClick
                    localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
                    onRowClick={handleClick}
                />
            </Box>
        </Modal>
    );
};

export default CompanyModal;
