import { FC } from 'react';
import { Delete, Edit } from '@mui/icons-material';
import { IconButton } from '@mui/material';

import styles from './legend.module.less';

const LegendItemEditMenu: FC = () => {
    return (
        <div className={styles.itemEditMenu}>
            <IconButton>
                <Edit />
            </IconButton>
            <IconButton>
                <Delete />
            </IconButton>
        </div>
    );
};

export default LegendItemEditMenu;
