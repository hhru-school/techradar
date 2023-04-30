import { FC, useMemo } from 'react';
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

const initialState = {
    pagination: {
        paginationModel: {
            pageSize: 10,
        },
    },
};

const MyRadarsDataGrid: FC = () => {
    const rows = useAppSelector((state) => state.myRadars.radarGrid);
    const { rowsId } = useParams();

    const gridRows = useMemo(
        () =>
            typeof rowsId === 'string'
                ? rows[rowsId]
                : [
                      {
                          id: 1,
                          radarName: 'ошибка',
                          relevantAt: 'ошибка',
                          lastUpdate: 'ошибка',
                          status: 'ошибка',
                      },
                  ],
        [rows, rowsId]
    );

    return (
        <Box sx={{ height: 'calc(100vh - 240px)', width: '100%' }}>
            <DataGrid
                rows={gridRows}
                columns={columns}
                initialState={initialState}
                pageSizeOptions={[5]}
                disableRowSelectionOnClick
                localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
            />
        </Box>
    );
};

export default MyRadarsDataGrid;
