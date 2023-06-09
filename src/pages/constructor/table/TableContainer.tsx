import { FC, memo, useCallback, useState } from 'react';
import { Button } from '@mui/material';

import { RadarInterface } from '../../../components/radar/types';
import { openCreateBlipModal } from '../../../store/editRadarSlice';
import { useAppDispatch } from '../../../store/hooks';
import EditableLegend from '../legend/EditableLegend';
import Table from './Table';
import ViewModeControl from './ViewModeControl';

import styles from './tableContainer.module.less';

type Props = {
    radar: RadarInterface;
};

export type Mode = 'table' | 'legend';

const TableContainer: FC<Props> = ({ radar }) => {
    const [viewMode, setViewMode] = useState<Mode>('legend');

    const dispatch = useAppDispatch();

    const modeChangeHandler = useCallback(
        (mode: Mode) => {
            setViewMode(mode);
        },
        [setViewMode]
    );

    const addBlipClickHandler = useCallback(() => {
        dispatch(openCreateBlipModal());
    }, [dispatch]);

    return (
        <div className={styles.main}>
            <div className={styles.upperContainer}>
                <Button color="success" variant="contained" onClick={addBlipClickHandler}>
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
