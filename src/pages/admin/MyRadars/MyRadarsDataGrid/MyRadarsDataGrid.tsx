import { FC, useEffect, useCallback, useState } from 'react';
import { useParams } from 'react-router';
import { Box } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

const columns: GridColDef[] = [
    {
        field: 'radarName',
        headerName: 'Имя радара',
        type: 'string',
        width: 150,
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
        field: 'lastUpdate',
        headerName: 'Последнее обновление',
        type: 'string',
        width: 110,
        editable: true,
    },
    {
        field: 'status',
        headerName: 'Статус',
        type: 'string',
        width: 110,
        editable: true,
    },
];

const rows = {
    android: [
        {
            id: 1,
            radarName: '2023Q1',
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
};

const MyRadarsDataGrid: FC = () => {
    const { rowsId } = useParams();
    const [grid, setGrid] = useState<
        Array<{ id: number; radarName: string; relevantAt: string; lastUpdate: string; status: string }>
    >([
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
        if (typeof rowsId === 'number') {
            setGrid(rows[rowsId]);
        } else {
            setGrid(rows.android);
        }
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
                checkboxSelection
                disableRowSelectionOnClick
            />
        </Box>
    );
};

export default MyRadarsDataGrid;
