import { FC, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowForward, Edit } from '@mui/icons-material';
import { Alert, AlertTitle, Button, Stack } from '@mui/material';

import { buildEditRadarVersionUrl, buildRadarViewerUrl } from '../../../../api/radarApiUtils';
import { setShowSaveRadarDialog } from '../../../../store/editRadarSlice';
import { useAppDispatch } from '../../../../store/hooks';

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
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const radarViewerLinkBtn = useCallback(() => {
        navigate(buildRadarViewerUrl(companyId, radarId, versionId), { replace: true });
    }, [navigate, radarId, companyId, versionId]);

    const radarEditLinkBtn = useCallback(() => {
        navigate(buildEditRadarVersionUrl(versionId), { replace: true });
        dispatch(setShowSaveRadarDialog(false));
    }, [navigate, versionId, dispatch]);

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
                <Button fullWidth={true} endIcon={<ArrowForward />} variant="contained" onClick={radarViewerLinkBtn}>
                    К просмотру радара
                </Button>
                <Button fullWidth={true} startIcon={<Edit />} variant="outlined" onClick={radarEditLinkBtn}>
                    Редактировать радар
                </Button>
            </Stack>
        </>
    );
};

export default SuccessDialog;
