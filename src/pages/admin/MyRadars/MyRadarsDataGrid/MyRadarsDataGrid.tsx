import { FC, useEffect, useCallback, useState } from 'react';
import { useParams } from 'react-router';
import { Box } from '@mui/material';
import { DataGrid, GridColDef, ruRU } from '@mui/x-data-grid';

type Row = { id: number; radarName: string; relevantAt: string; lastUpdate: string; status: string };
type Grid = Array<Row>;

const columns: GridColDef[] = [
    {
        field: 'radarName',
        headerName: 'Имя радара',
        type: 'string',
        width: 150,
        editable: true,
    },
    // {
    //     field: 'actions',
    //     type: 'actions',
    //     width: 80,
    //     getActions: (params: GridRowParams<string>) => [
    //         <GridActionsCellItem icon={<Link to={params.value}>{params.value}</Link>} label="LINK" />,
    //     ],
    // },
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
        width: 180,
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

const rows = {
    android: [
        {
            id: 1,
            radarName: '2023Q1',
            link: 'android-radar',
            relevantAt: '01.01.2023',
            lastUpdate: '16 апреля 2023 20:55',
            status: 'Опубликовано',
        },
        {
            id: 2,
            radarName: '2023Q2',
            relevantAt: '01.05.2023',
            lastUpdate: '16 апреля 2023 20:55',
            status: 'Опубликовано',
        },
    ],
    backend: [
        {
            id: 1,
            radarName: '2023Q4',
            relevantAt: '01.04.2023',
            lastUpdate: '16 апреля 2023 20:55',
            status: 'Опубликовано',
        },
    ],
    data: [
        {
            id: 1,
            radarName: '2023',
            relevantAt: '01.04.2023',
            lastUpdate: '16 апреля 2023 20:55',
            status: 'Опубликовано',
        },
    ],
    frontend: [
        {
            id: 1,
            radarName: '2023',
            relevantAt: '01.04.2023',
            lastUpdate: '16 апреля 2023 20:55',
            status: 'Опубликовано',
        },
    ],
    ios: [
        {
            id: 1,
            radarName: '2023',
            relevantAt: '01.04.2023',
            lastUpdate: '16 апреля 2023 20:55',
            status: 'Опубликовано',
        },
    ],
    qa: [
        {
            id: 1,
            radarName: '2023',
            relevantAt: '01.04.2023',
            lastUpdate: '16 апреля 2023 20:55',
            status: 'Опубликовано',
        },
    ],
    datawarehouse: [
        {
            id: 1,
            radarName: '2023',
            relevantAt: '01.04.2023',
            lastUpdate: '16 апреля 2023 20:55',
            status: 'Опубликовано',
        },
    ],
};

const MyRadarsDataGrid: FC = () => {
    const { rowsId } = useParams();
    const [grid, setGrid] = useState<Grid>([
        {
            id: 1,
            radarName: '2023Q4',
            relevantAt: '01.04.2023',
            lastUpdate: '16 апреля 2023 20:55',
            status: 'Опубликовано',
        },
        {
            id: 4,
            radarName: '2023Q4',
            relevantAt: '01.04.2023',
            lastUpdate: '16 апреля 2023 20:55',
            status: 'Опубликовано',
        },
        {
            id: 5,
            radarName: '2023Q4',
            relevantAt: '01.04.2023',
            lastUpdate: '16 апреля 2023 20:55',
            status: 'Опубликовано',
        },
    ]);

    const updateRows = useCallback(() => {
        return typeof rowsId !== undefined ? setGrid(rows[rowsId] as Grid) : setGrid(rows[rowsId] as Grid);
    }, [rowsId]);

    useEffect(() => {
        updateRows();
    }, [rowsId, updateRows]);

    return (
        <Box sx={{ height: '100vh', width: '100%' }}>
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
