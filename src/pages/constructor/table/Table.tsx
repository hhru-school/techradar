import { FC, memo, useMemo } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import { FormattedRadarData } from '../../../api/radarApiUtils';

type Props = {
    radar: FormattedRadarData;
};

const Table: FC<Props> = ({ radar }) => {
    const rows = radar.blips;

    const columns: GridColDef[] = useMemo(
        () => [
            { field: 'name', headerName: 'Технология', type: 'string', width: 180, editable: true },
            {
                field: 'sectorName',
                headerName: 'Сектор',
                type: 'singleSelect',
                width: 180,
                editable: true,
                valueOptions: radar.sectorNames,
            },
            {
                field: 'ringName',
                headerName: 'Кольцо',
                type: 'singleSelect',
                width: 180,
                editable: true,
                valueOptions: radar.ringNames,
            },
        ],
        [radar]
    );

    return (
        <div>
            <DataGrid rows={rows} columns={columns} />
        </div>
    );
};

export default memo(Table);
