import { FC } from 'react';
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';
import TableRowsOutlinedIcon from '@mui/icons-material/TableRowsOutlined';
import { Radio } from '@mui/material';

import { Mode } from './TableContainer';

import styles from './tableContainer.module.less';

type Props = { mode: Mode; changeHandler: (mode: Mode) => void };

const ViewModeControl: FC<Props> = ({ mode, changeHandler: onChange }) => {
    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value as Mode);
    };

    return (
        <div className={styles.viewModeControl}>
            <Radio checked={mode === 'legend'} onChange={changeHandler} value="legend" />
            <AppsOutlinedIcon />
            <Radio checked={mode === 'table'} onChange={changeHandler} value="table" />
            <TableRowsOutlinedIcon />
        </div>
    );
};

export default ViewModeControl;
