import { FC, memo } from 'react';
import { Close } from '@mui/icons-material';
import { IconButton } from '@mui/material';

import styles from './modal.module.less';

type Props = {
    closeHandler: () => void;
};

const CloseButton: FC<Props> = ({ closeHandler }) => {
    return (
        <div className={styles.closeBtnContainer}>
            <IconButton onClick={closeHandler}>
                <Close />
            </IconButton>
        </div>
    );
};

export default memo(CloseButton);
