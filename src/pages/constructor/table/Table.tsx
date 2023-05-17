import { FC, memo, useMemo } from 'react';
import { DataGrid, GridColDef, GridRowParams, useGridApiRef } from '@mui/x-data-grid';

import { FormattedRadarData } from '../../../api/radarApiUtils';
import { clearActiveBlip, setActiveBlip } from '../../../store/activeBlipSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';

import styles from './tableContainer.module.less';

type Props = {
    radar: FormattedRadarData;
};

const gridSx = {
    '.MuiDataGrid-columnHeaderTitle': {
        fontWeight: 'bold !important',
    },
};

const Table: FC<Props> = ({ radar }) => {
    const rows = radar.blips;

    const apiRef = useGridApiRef();

    const activeId = useAppSelector((state) => state.activeBlip.id);

    const dispatch = useAppDispatch();

    const handleMouseEnter = (event: React.MouseEvent) => {
        const id = Number(event.currentTarget.getAttribute('data-id'));
        dispatch(setActiveBlip(id));
    };

    const handleMouseLeave = () => {
        dispatch(clearActiveBlip());
    };

    const columns: GridColDef[] = useMemo(
        () => [
            {
                field: 'name',
                headerName: 'Технология',
                type: 'string',
                width: 120,
                headerClassName: styles.tableHeader,
            },
            {
                field: 'sectorName',
                headerName: 'Сектор',
                width: 180,
                valueOptions: radar.sectorNames,
                headerClassName: styles.tableHeader,
            },
            {
                field: 'ringName',
                headerName: 'Кольцо',

                width: 180,

                headerClassName: styles.tableHeader,
            },
        ],
        [radar]
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
