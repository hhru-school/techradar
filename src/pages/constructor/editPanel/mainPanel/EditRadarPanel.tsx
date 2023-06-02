import { FC, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowForward } from '@mui/icons-material';
import { Button } from '@mui/material';

import { buildRadarViewerUrl } from '../../../../api/radarApiUtils';
import { setShowSwitchReleaseModal } from '../../../../store/editRadarSlice';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import EditCredetialContainer from '../EditCredetionalContainer';
import VersionStatusContainer from '../VersionStatusContainer';

import styles from './mainEditPanel.module.less';

const EditRadarPanel: FC = () => {
    const dispatch = useAppDispatch();

    const name = useAppSelector((state) => state.editRadar.radar.name);
    const version = useAppSelector((state) => state.editRadar.version);

    const navigate = useNavigate();

    const isReleased = version?.release;

    const toggleReleaseClickHandler = useCallback(() => {
        dispatch(setShowSwitchReleaseModal(true));
    }, [dispatch]);

    const navigateClickHandeler = useCallback(() => {
        if (version) {
            navigate(buildRadarViewerUrl(1, version?.radarId, version?.id));
        }
    }, [navigate, version]);

    return (
        <>
            <EditCredetialContainer label={'Название радара'} value={name} />
            {version && <EditCredetialContainer label={'Версия'} value={version.name} />}
            <Button variant="outlined" color="secondary" onClick={navigateClickHandeler} endIcon={<ArrowForward />}>
                На страницу просмотра
            </Button>
            <div className={styles.spacer}></div>
            {version && <VersionStatusContainer release={version?.release} />}
            {isReleased ? (
                <Button variant="outlined" color="error" onClick={toggleReleaseClickHandler}>
                    Снять с публикации
                </Button>
            ) : (
                <Button variant="contained" color="success" onClick={toggleReleaseClickHandler}>
                    Опубликовать
                </Button>
            )}
        </>
    );
};

export default EditRadarPanel;
