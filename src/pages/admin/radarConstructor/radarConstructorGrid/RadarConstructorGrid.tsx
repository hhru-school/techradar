import { FC, useCallback, useMemo } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from '@mui/material';
import { DataGrid, GridColDef, ruRU, GridActionsCellItem, GridRowId } from '@mui/x-data-grid';

import { updateBlips } from '../../../../store/constructorRadarSlice';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';

const initialState = {
    pagination: {
        paginationModel: {
            pageSize: 10,
        },
    },
};

const RadarConstructorGrid: FC = () => {
    const dispatch = useAppDispatch();
    const sectorNames = useAppSelector((state) => state.constructorRadar.sectorNames);
    const ringNames = useAppSelector((state) => state.constructorRadar.ringNames);
    const blips = useAppSelector((state) => state.constructorRadar.blips);

    const deleteRow = useCallback(
        (id: GridRowId) => {
            dispatch(updateBlips(blips.filter((blip) => blip.id !== id)));
        },
        [blips, dispatch]
    );

    const columns = useMemo<GridColDef[]>(
        () => [
            {
                field: 'name',
                headerName: 'Название',
                type: 'string',
                width: 150,
                editable: true,
            },
            {
                field: 'ringName',
                headerName: 'Кольцо',
                type: 'singleSelect',
                width: 100,
                editable: true,
                valueOptions: () => ringNames,
            },
            {
                field: 'sectorName',
                headerName: 'Сектор',
                type: 'singleSelect',
                width: 100,
                editable: true,
                valueOptions: () => sectorNames,
            },
            {
                field: 'actions',
                type: 'actions',
                width: 30,
                getActions: (params) => [
                    <GridActionsCellItem icon={<DeleteIcon />} label="Delete" onClick={() => deleteRow(params.id)} />,
                ],
            },
        ],
        [deleteRow, ringNames, sectorNames]
    );

    return (
        <Box sx={{ width: '100%', height: 'calc(100vh - 274px)' }}>
            <DataGrid
                rows={blips}
                columns={columns}
                initialState={initialState}
                pageSizeOptions={[5]}
                disableRowSelectionOnClick
                localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
            />
        </Box>
    );
};

export default RadarConstructorGrid;
