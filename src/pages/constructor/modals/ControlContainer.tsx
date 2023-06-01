import { FC } from 'react';
import { Button } from '@mui/material';

import styles from './modal.module.less';

export interface Values {
    comment: string;
}

type Props = {
    submitHandler?: (values: Values) => Promise<void>;
    confirmHandler?: React.MouseEventHandler;
    cancelHandler: React.MouseEventHandler;
    isLoading: boolean;
    isSubmit?: boolean;
    color?: 'success' | 'error' | 'primary';
};

const btnSx = { width: 140 };
const ControlContainer: FC<Props> = ({
    confirmHandler,
    cancelHandler,
    isLoading,
    isSubmit = false,
    color = 'primary',
}) => {
    const type = isSubmit ? 'submit' : 'button';
    return (
        <div className={styles.buttonContainer}>
            <Button
                sx={btnSx}
                color={color}
                variant="contained"
                onClick={isSubmit ? undefined : confirmHandler}
                type={type}
                disabled={isLoading}
            >
                Принять
            </Button>
            <Button sx={btnSx} variant="outlined" onClick={cancelHandler} type="button" disabled={isLoading}>
                Отмена
            </Button>
        </div>
    );
};

export default ControlContainer;
