import { FC, useMemo } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { Alert, Box, Skeleton, SxProps, darken, lighten, styled } from '@mui/material';
import { DataGrid, GridColDef, ruRU } from '@mui/x-data-grid';

import { useGetRadarVersionsQuery } from '../../../../api/radarsGridApi';
import { useAppSelector } from '../../../../store/hooks';
import NoRadarsMock from '../noRadarsMock/NoRadarsMock';
import { RadarVersionData, VersionData } from './types';

const styles: Record<string, SxProps> = {
    box: { height: 'calc(100vh - 320px)', width: '100%' },
};

const initialState = {
    pagination: {
        paginationModel: {
            pageSize: 10,
        },
    },
};

const MyRadarsDataGrid: FC = () => {
    const navigate = useNavigate();
    const { radarId } = useParams();
    const id = Number(radarId) || 0;

    const { data: radarVersions, isError, isLoading } = useGetRadarVersionsQuery(id);
    const isfilteredVersionsList = useAppSelector((state) => state.myRadars.isfilteredVersionsList);

    const onlyPublicAndLastDraft = radarVersions?.filter((version) => version.release || version.toggleAvailable);
    const versionRows = isfilteredVersionsList ? onlyPublicAndLastDraft : radarVersions;
    const rows: RadarVersionData | [] = useMemo(
        () =>
            radarVersions && versionRows
                ? versionRows.map((item: VersionData) => {
                      return {
                          ...item,
                          release: item.release ? 'да' : 'нет',
                          creationTime: new Date(item.creationTime).toLocaleString(),
                          lastChangeTime: new Date(item.lastChangeTime).toLocaleString(),
                      };
                  })
                : [],
        [radarVersions, versionRows]
    );

    const columns: GridColDef[] = useMemo(
        () => [
            {
                field: 'name',
                headerName: 'Имя версии',
                type: 'string',
                width: 350,
                editable: false,
            },
            {
                field: 'release',
                headerName: 'Опубликован',
                type: 'string',
                width: 180,
                editable: false,
            },
            {
                field: 'lastChangeTime',
                headerName: 'Последнее обновление',
                type: 'string',
                width: 300,
                editable: false,
            },
            {
                field: 'creationTime',
                headerName: 'Время создания',
                type: 'string',
                width: 300,
                editable: false,
            },
            {
                field: 'parentId',
                headerName: 'Родительская версия',
                type: 'string',
                width: 350,
                editable: false,
            },
            // {
            //     field: 'toggleAvailable',
            //     headerName: 'toggleAvailable',
            //     type: 'string',
            //     width: 120,
            //     editable: false,
            // },
            // {
            //     field: 'id',
            //     headerName: 'id',
            //     type: 'string',
            //     width: 100,
            //     editable: false,
            // },
            // {
            //     field: 'parentId',
            //     headerName: 'parentId',
            //     type: 'string',
            //     width: 350,
            //     editable: false,
            // },
        ],
        []
    );

    const getBackgroundColor = (color: string, mode: string) =>
        mode === 'dark' ? darken(color, 0.6) : lighten(color, 0.9);

    const getHoverBackgroundColor = (color: string, mode: string) =>
        mode === 'dark' ? darken(color, 0.6) : lighten(color, 0.8);

    const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
        '& .super-app-theme--нет': {
            backgroundColor: getBackgroundColor(theme.palette.primary.main, theme.palette.mode),
            '&:hover': {
                backgroundColor: getHoverBackgroundColor(theme.palette.primary.main, theme.palette.mode),
            },
        },
    }));

    return (
        <Box sx={styles.box}>
            {isError && (
                <Alert severity="error">Произошла ошибка попробуйте перезагрузить страницу или зайти позже</Alert>
            )}
            {isLoading && <Skeleton variant="rounded" width={'100%'} height={'100%'} />}
            {!rows.length && <NoRadarsMock />}
            {!!rows.length && (
                <StyledDataGrid
                    rows={rows}
                    columns={columns}
                    initialState={initialState}
                    pageSizeOptions={[5]}
                    disableRowSelectionOnClick
                    localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
                    getRowClassName={(params) => `super-app-theme--${params.row.release as string}`}
                    onRowClick={(params) => navigate(`/constructor/edit/version/${(params.row as VersionData).id}`)}
                />
            )}
        </Box>
    );
};

export default MyRadarsDataGrid;
