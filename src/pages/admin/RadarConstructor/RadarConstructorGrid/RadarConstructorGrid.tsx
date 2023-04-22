import { FC, useCallback, useMemo } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from '@mui/material';
import { DataGrid, GridColDef, ruRU, GridActionsCellItem, GridRowId } from '@mui/x-data-grid';

import { updateRadarConstrGrid } from '../../../../store/constructorRadarSlice';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';

export interface RowRadarConstructor {
    id: number | string;
    techName: string;
    Circle: number;
    sector: number;
}
export type GridRadarConstructor = Array<RowRadarConstructor>;

const initialState = {
    pagination: {
        paginationModel: {
            pageSize: 10,
        },
    },
};

const RadarConstructorGrid: FC = () => {
    const dispatch = useAppDispatch();
    const rows = useAppSelector((state) => state.constructorRadar.radarConstructorGrid);
    const countSectors = useAppSelector((state) => state.constructorRadar.countSectorInputs);
    const countCircles = useAppSelector((state) => state.constructorRadar.countCircleInputs);

    const deleteRow = useCallback(
        (id: GridRowId) => {
            dispatch(updateRadarConstrGrid(rows.filter((row) => row.id !== id)));
        },
        [rows, dispatch]
    );

    const counter = (count: number): Array<number> => {
        const arr = [];
        for (let i = 1; i < count + 1; i++) {
            arr.push(i);
        }
        return arr;
    };

    const columns = useMemo<GridColDef[]>(
        () => [
            {
                field: 'techName',
                headerName: 'Название',
                type: 'string',
                width: 150,
                editable: true,
            },
            {
                field: 'Circle',
                headerName: 'Кольцо',
                type: 'singleSelect',
                width: 100,
                editable: true,
                valueOptions: () => {
                    return counter(countCircles);
                },
            },
            {
                field: 'sector',
                headerName: 'Сектор',
                type: 'singleSelect',
                width: 100,
                editable: true,
                valueOptions: () => {
                    return counter(countSectors);
                },
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
        [deleteRow, countCircles, countSectors]
    );

    return (
        <Box sx={{ width: '100%', height: 'calc(100vh - 274px)' }}>
            <DataGrid
                rows={rows}
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
