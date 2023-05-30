import { FC, useCallback, useMemo } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, SxProps } from '@mui/material';
import { DataGrid, GridActionsCellItem, GridColDef, GridRowId, ruRU } from '@mui/x-data-grid';

import { useDeleteRadarVersionsMutation, useGetRadarVersionsQuery } from '../../../../api/radarsGridApi';
import { RadarVersionData, VersionData } from '../../../../api/types';

const styles: Record<string, SxProps> = {
    box: { height: 'calc(100vh - 240px)', width: '100%' },
};

type GridRadar = Array<RadarVersionData>;

export interface GridRadarObj {
    [index: string]: GridRadar;
}

const initialState = {
    pagination: {
        paginationModel: {
            pageSize: 10,
        },
    },
};

const MyRadarsDataGrid: FC = () => {
    const { radarId } = useParams();
    const id = Number(radarId);
    const { data: radarVersions } = useGetRadarVersionsQuery(id);
    const [deleteRadarVersions] = useDeleteRadarVersionsMutation();

    const rows: RadarVersionData | [] = useMemo(
        () =>
            radarVersions !== undefined
                ? radarVersions.map((item: VersionData) => {
                      return {
                          ...item,
                          creationTime: new Date(item.creationTime).toLocaleString(),
                          lastChangeTime: new Date(item.lastChangeTime).toLocaleString(),
                      };
                  })
                : [],
        [radarVersions]
    );

    const editVersion = useCallback(
        (params: { id: GridRowId }) => [
            <Link to={`/constructor/edit/version/${params.id}`}>
                <GridActionsCellItem icon={<EditIcon />} label="edit" />
            </Link>,
        ],
        []
    );
    const deleteRow = useCallback((id: GridRowId) => deleteRadarVersions(id), [deleteRadarVersions]);
    const deleteVersionRow = useCallback(
        (params: { id: GridRowId }) => [
            <GridActionsCellItem icon={<DeleteIcon />} label="Delete" onClick={() => deleteRow(params.id)} />,
        ],
        [deleteRow]
    );

    const columns: GridColDef[] = useMemo(
        () => [
            {
                field: 'name',
                headerName: 'Имя версии',
                type: 'string',
                width: 150,
                editable: false,
            },
            {
                field: 'release',
                headerName: 'Опубликован',
                type: 'boolean',
                width: 150,
                editable: false,
            },
            {
                field: 'lastChangeTime',
                headerName: 'Последнее обновление',
                type: 'string',
                width: 250,
                editable: false,
            },
            {
                field: 'creationTime',
                headerName: 'Время создания',
                type: 'string',
                width: 250,
                editable: false,
            },
            {
                field: 'edit',
                type: 'actions',
                width: 30,
                getActions: editVersion,
            },
            {
                field: 'delete',
                type: 'actions',
                width: 30,
                getActions: deleteVersionRow,
            },
        ],
        [deleteVersionRow, editVersion]
    );

    return (
        <Box sx={styles.box}>
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

export default MyRadarsDataGrid;
