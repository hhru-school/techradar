import { FC, memo, useCallback, useMemo } from 'react';
import { Delete, Edit } from '@mui/icons-material';
import { DataGrid, GridActionsCellItem, GridColDef, GridRowId, GridRowParams, useGridApiRef } from '@mui/x-data-grid';

import { RadarInterface } from '../../../components/radar/types';
import { clearActiveBlip, setActiveBlip } from '../../../store/activeBlipSlice';
import { openDeleteBlipModal, openEditBlipModal } from '../../../store/editRadarSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';

import styles from './tableContainer.module.less';

type Props = {
    radar: RadarInterface;
};

const nameColumnWidth = 120;
const sectorColumnWidth = 190;
const ringNameWidth = 120;
const tableWidth = 520;

const gridSx = {
    width: tableWidth,
    '.MuiDataGrid-columnHeaderTitle': {
        fontWeight: 'bold',
    },
};

const Table: FC<Props> = ({ radar }) => {
    const rows = radar.blips;

    const apiRef = useGridApiRef();

    const activeId = useAppSelector((state) => state.activeBlip.id);

    const dispatch = useAppDispatch();

    const handleMouseEnter = useCallback(
        (event: React.MouseEvent) => {
            const id = Number(event.currentTarget.getAttribute('data-id'));
            dispatch(setActiveBlip(id));
        },
        [dispatch]
    );

    const handleMouseLeave = useCallback(() => {
        dispatch(clearActiveBlip());
    }, [dispatch]);

    const deleteBtnHandler = useCallback(
        (id: GridRowId) => () => {
            dispatch(openDeleteBlipModal(id as number));
        },
        [dispatch]
    );

    const editBtnHandler = useCallback(
        (id: GridRowId) => () => {
            dispatch(openEditBlipModal(id as number));
        },
        [dispatch]
    );

    const columns: GridColDef[] = useMemo(
        () => [
            {
                field: 'name',
                headerName: 'Технология',
                type: 'string',
                width: nameColumnWidth,
                headerClassName: styles.tableHeader,
            },
            {
                field: 'sectorName',
                headerName: 'Сектор',
                width: sectorColumnWidth,
                headerClassName: styles.tableHeader,
            },
            {
                field: 'ringName',
                headerName: 'Кольцо',
                width: ringNameWidth,
                headerClassName: styles.tableHeader,
            },
            {
                field: 'actions',
                type: 'actions',
                width: tableWidth - nameColumnWidth - sectorColumnWidth - ringNameWidth - 20,
                cellClassName: 'actions',
                getActions: (params) => [
                    <GridActionsCellItem icon={<Edit />} label="Edit" onClick={editBtnHandler(params.id)} />,
                    <GridActionsCellItem icon={<Delete />} label="Delete" onClick={deleteBtnHandler(params.id)} />,
                ],
            },
        ],
        [deleteBtnHandler, editBtnHandler]
    );

    return (
        <DataGrid
            className={styles.table}
            isRowSelectable={() => false}
            apiRef={apiRef}
            sx={gridSx}
            columns={columns}
            getRowClassName={(params: GridRowParams) =>
                params.id === activeId ? styles.tableRowActive : styles.tableRow
            }
            rows={rows}
            slotProps={{
                row: {
                    onMouseEnter: handleMouseEnter,
                    onMouseLeave: handleMouseLeave,
                },
            }}
        />
    );
};

export default memo(Table);
