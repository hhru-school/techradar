import { FC, useEffect, useCallback, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Box } from '@mui/material';
import { DataGrid, GridColDef, ruRU, GridRenderCellParams } from '@mui/x-data-grid';

import { useAppSelector } from '../../../../store/hooks';

type RowRadar = {
    id: number;
    link?: string;
    radarName: string;
    relevantAt: string;
    lastUpdate: string;
    status: string;
};
type GridRadar = Array<RowRadar>;

export interface GridRadarObj {
    [index: string]: GridRadar;
}

const columns: GridColDef[] = [
    {
        field: 'radarName',
        headerName: 'Имя радара',
        type: 'string',
        width: 150,
        editable: true,
    },
    {
        field: 'link',
        headerName: 'Ссылка',
        type: 'string',
        width: 150,
        renderCell: (params: GridRenderCellParams<typeof Link>) => (
            <Link to={params.value as string}>{params.value}</Link>
        ),
    },
    {
        field: 'relevantAt',
        headerName: 'Актуальность',
        type: 'string',
        width: 150,
        editable: true,
    },
    {
        field: 'lastUpdate',
        headerName: 'Последнее обновление',
        type: 'string',
        width: 200,
        editable: true,
    },
    {
        field: 'status',
        headerName: 'Статус',
        type: 'string',
        width: 150,
        editable: true,
    },
];

const MyRadarsDataGrid: FC = () => {
    const rows = useAppSelector((state) => state.data.radarGrid);
    const { rowsId } = useParams();
    const [grid, setGrid] = useState<GridRadar>([
        {
            id: 1,
            radarName: 'ошибка',
            relevantAt: 'ошибка',
            lastUpdate: 'ошибка',
            status: 'ошибка',
        },
    ]);

    const updateRows = useCallback(() => {
        if (typeof rowsId === 'string') {
            return setGrid(rows[rowsId]);
        }
        return setGrid(grid);
    }, [rowsId, grid, rows]);

    useEffect(() => {
        updateRows();
    }, [rowsId, updateRows]);

    return (
        <Box sx={{ height: 'calc(100vh - 240px)', width: '100%' }}>
            <DataGrid
                rows={grid}
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

export default MyRadarsDataGrid;
