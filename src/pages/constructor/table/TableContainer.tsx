import { FC, memo, useState } from 'react';
import { Button } from '@mui/material';

import { FormattedRadarData } from '../../../api/radarApiUtils';
import EditableLegend from '../legend/EditableLegend';
import Table from './Table';
import ViewModeControl from './ViewModeControl';

import styles from './tableContainer.module.less';

type Props = {
    radar: FormattedRadarData;
};

export type Mode = 'table' | 'legend';

const TableContainer: FC<Props> = ({ radar }) => {
    const [viewMode, setViewMode] = useState<Mode>('legend');

    const modeChangeHandler = (mode: Mode) => {
        setViewMode(mode);
    };

    return (
        <div className={styles.main}>
            <div className={styles.upperContainer}>
                <Button color="success" variant="contained">
                    Добавить
                </Button>
                <ViewModeControl mode={viewMode} changeHandler={modeChangeHandler} />
            </div>
            {viewMode === 'legend' && <EditableLegend radar={radar} />}
            {viewMode === 'table' && <Table radar={radar} />}
        </div>
    );
};

export default memo(TableContainer);