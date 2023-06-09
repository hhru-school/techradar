import { FC } from 'react';
import { Alert } from '@mui/material';

import { isErrorWithType } from '../../../../api/helpers';
import { ErrorType } from '../../../../api/types';

type Props = {
    error: unknown;
};

const style = {
    alert: { mt: 2 },
};

const NotSuccessDialog: FC<Props> = ({ error }) => {
    if (!error) return null;
    let message = '';
    if (isErrorWithType(error) && error.data.type === ErrorType.EntityExists) {
        message = 'Радар с таким названием уже существует!';
    } else {
        message = 'Сохранить радар не удалось!..';
    }

    return (
        <Alert severity="error" sx={style.alert}>
            {message}
        </Alert>
    );
};

export default NotSuccessDialog;
