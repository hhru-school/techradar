import { FC, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowForward, Edit } from '@mui/icons-material';
import { Alert, AlertTitle, Button, Stack } from '@mui/material';
import { FC, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowForward, Edit } from '@mui/icons-material';
import { Alert, AlertTitle, Button, Stack } from '@mui/material';

import { buildRadarUrl } from '../../../../api/radarApiUtils';

import { buildRadarUrl } from '../../../../api/radarApiUtils';

type Props = {
    radarName: string;
    radarVersion: string;
    radarId: number;
    versionId: number;
    companyId: number;
};

const style = {
    stack: { mt: 4 },
};

const SuccessDialog: FC<Props> = ({ radarName, radarVersion, radarId, versionId, companyId }) => {
    const navigate = useNavigate();

    const linkBtnHandler = useCallback(() => {
        navigate(buildRadarUrl(companyId, radarId, versionId), { replace: true });
    }, [navigate, radarId, companyId, versionId]);

    return (
        <>
            <Alert severity="success">
                <AlertTitle>Радар сохранён</AlertTitle>
                Радар: <strong>{radarName}</strong> <br />
                Версия: <strong>{radarVersion}</strong>
                <br />
                успешно сохранён.
            </Alert>
            <Stack spacing={2} sx={style.stack}>
                <Button
                    fullWidth={true}
                    endIcon={<ArrowForward />}
                    variant="contained"
                    color="secondary"
                    onClick={linkBtnHandler}
                >
                    К просмотру радара
                </Button>
                <Button fullWidth={true} startIcon={<Edit />} variant="outlined">
                    Редактировать радар
                </Button>
            </Stack>
            <Stack spacing={2} sx={style.stack}>
                <Button
                    fullWidth={true}
                    endIcon={<ArrowForward />}
                    variant="contained"
                    color="secondary"
                    onClick={linkBtnHandler}
                >
                    К просмотру радара
                </Button>
                <Button fullWidth={true} startIcon={<Edit />} variant="outlined">
                    Редактировать радар
                </Button>
            </Stack>
        </>
    );
};

export default SuccessDialog;
