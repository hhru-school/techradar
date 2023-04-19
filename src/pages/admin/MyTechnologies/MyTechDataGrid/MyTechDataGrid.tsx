import { FC, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from '@mui/material';
import { DataGrid, GridColDef, ruRU, GridRenderCellParams, GridActionsCellItem, GridRowId } from '@mui/x-data-grid';

import { updateTechGrid } from '../../../../store/dataSlice';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';

export interface RowTech {
    id: number | string;
    link?: string;
    techName: string;
    relevantAt: string;
    lastVersion: string;
    comment: string;
}
export type GridTech = Array<RowTech>;

const MyTechDataGrid: FC = () => {
    const dispatch = useAppDispatch();
    const rows = useAppSelector((state) => state.data.techGrid);

    const deleteRow = useCallback(
        (id: GridRowId) => {
            dispatch(updateTechGrid(rows.filter((row) => row.id !== id)));
        },
        [rows, dispatch]
    );

    const columns = useMemo<GridColDef[]>(
        () => [
            {
                field: 'techName',
                headerName: 'Название технологии',
                type: 'string',
                width: 200,
                editable: true,
            },
            {
                field: 'link',
                headerName: 'Ссылка на доку',
                type: 'string',
                width: 150,
                renderCell: (params: GridRenderCellParams<typeof Link>) => (
                    <Link to={params.value as string}>{params.value}</Link>
                ),
                editable: true,
            },
            {
                field: 'relevantAt',
                headerName: 'Актуальность',
                type: 'string',
                width: 150,
                editable: true,
            },
            {
                field: 'lastVersion',
                headerName: 'Последняя используемая версия',
                type: 'string',
                width: 270,
                editable: true,
            },
            {
                field: 'comment',
                headerName: 'Комментарий',
                type: 'string',
                width: 410,
                editable: true,
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
        [deleteRow]
    );

    return (
        <Box sx={{ height: 'calc(100vh - 190px)', width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 10,
                        },
                    },
                }}
                pageSizeOptions={[5]}
                disableRowSelectionOnClick
                localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
            />
        </Box>
    );
};

export default MyTechDataGrid;
