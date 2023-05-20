import { FC } from 'react';
import { Alert, AlertTitle } from '@mui/material';

type Props = {
    radarName: string;
    radarVersion: string;
};

const SuccessDialog: FC<Props> = ({ radarName, radarVersion }) => {
    return (
        <>
            <Alert severity="success">
                <AlertTitle>Радар сохранён</AlertTitle>
                Радар: <strong>{radarName}</strong> <br />
                Версия: <strong>{radarVersion}</strong>
                <br />
                успешно сохранён.
            </Alert>
        </>
    );
};

export default SuccessDialog;
