import { FC, useCallback, useMemo } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Alert, Box, Button, Skeleton, SxProps, Typography } from '@mui/material';
import { DataGrid, GridActionsCellItem, GridColDef, GridRowId, ruRU } from '@mui/x-data-grid';

import { useDeleteRadarVersionMutation, useGetRadarVersionsQuery } from '../../../../api/radarsGridApi';
import { RadarVersionData, VersionData } from './types';

const styles: Record<string, SxProps> = {
    box: { height: 'calc(100vh - 240px)', width: '100%' },
    boxText: {
        height: 'calc(100vh - 240px)',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
    },
};

type GridRadar = Array<RadarVersionData>;

export interface GridRadarObj {
    [index: string]: GridRadar;
}

const NoRadarsMock: FC = () => {
    return (
        <Box sx={styles.boxText}>
            <Typography sx={{ marginRight: '5px' }} variant="h6">
                Кажется, у Вас нет радаров! Это не страшно, попробуйте
            </Typography>
            <Link to="/constructor/new/radar" style={{ textDecoration: 'underline' }}>
                <Button variant="contained" color="success">
                    СОЗДАТЬ СВОЙ ПЕРВЫЙ!
                </Button>
            </Link>
        </Box>
    );
};

const initialState = {
    pagination: {
        paginationModel: {
            pageSize: 10,
        },
    },
};

const MyRadarsDataGrid: FC = () => {
    const { radarId } = useParams();
    const id = Number(radarId) || 0;

    const { data: radarVersions, isError, isLoading } = useGetRadarVersionsQuery(id);
    const [deleteRadarVersion] = useDeleteRadarVersionMutation();

    const rows: RadarVersionData | [] = useMemo(
        () =>
            radarVersions !== undefined
                ? radarVersions.map((item: VersionData) => {
                      return {
                          ...item,
                          release: item.release ? 'да' : 'нет',
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
    const deleteRow = useCallback((id: GridRowId) => deleteRadarVersion(id), [deleteRadarVersion]);
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
                width: 120,
                editable: false,
            },
            {
                field: 'release',
                headerName: 'Опубликован',
                type: 'string',
                width: 120,
                editable: false,
            },
            {
                field: 'lastChangeTime',
                headerName: 'Последнее обновление',
                type: 'string',
                width: 180,
                editable: false,
            },
            {
                field: 'creationTime',
                headerName: 'Время создания',
                type: 'string',
                width: 180,
                editable: false,
            },
            {
                field: 'toggleAvailable',
                headerName: 'toggleAvailable',
                type: 'string',
                width: 120,
                editable: false,
            },
            {
                field: 'id',
                headerName: 'id',
                type: 'string',
                width: 100,
                editable: false,
            },
            {
                field: 'parentId',
                headerName: 'parentId',
                type: 'string',
                width: 100,
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
            {isError && <Alert severity="error">Произошла ошибка попробуйте перезагрузить страницу</Alert>}
            {isLoading && (
                <Skeleton sx={{ bgcolor: 'grey.900' }} variant="rectangular" width={'100%'} height={'100%'} />
            )}
            {!rows.length && <NoRadarsMock />}
            {!!rows.length && (
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={initialState}
                    pageSizeOptions={[5]}
                    disableRowSelectionOnClick
                    localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
                />
            )}
        </Box>
    );
};

export default MyRadarsDataGrid;
