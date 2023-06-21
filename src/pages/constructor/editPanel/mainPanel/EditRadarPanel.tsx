import { FC, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowForward } from '@mui/icons-material';
import { Button } from '@mui/material';

import { buildRadarViewerUrl } from '../../../../api/radarApiUtils';
import { openEditRadarNameModal, setShowEditVersionModal } from '../../../../store/editRadarSlice';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import PropertyItem from '../../components/PropertyItem';
import OnSaveInfoMessage from '../OnSaveInfoMessage';
import VersionStatusContainer from '../VersionStatusContainer';
import EditPropertyButtonPane from '../editPropertyButtonPanel/EditPropertyButtonPane';

import styles from './mainEditPanel.module.less';

const EditRadarPanel: FC = () => {
    const dispatch = useAppDispatch();

    const radarName = useAppSelector((state) => state.editRadar.radar.name);
    const version = useAppSelector((state) => state.editRadar.version);

    const navigate = useNavigate();

    const navigateClickHandeler = useCallback(() => {
        if (version) {
            navigate(buildRadarViewerUrl(1, version?.radarId, version?.id));
        }
    }, [navigate, version]);

    const editRadarHandler = useCallback(() => {
        dispatch(openEditRadarNameModal());
    }, [dispatch]);

    const editVersionHandler = useCallback(() => {
        dispatch(setShowEditVersionModal(true));
    }, [dispatch]);

    return (
        <>
            <EditPropertyButtonPane clickHandler={editRadarHandler}>
                <PropertyItem label={'Название радара'} value={radarName} />
            </EditPropertyButtonPane>

            <EditPropertyButtonPane clickHandler={editVersionHandler}>
                <PropertyItem label={'Версия'} value={version.name} />
                <VersionStatusContainer release={version?.release} />
            </EditPropertyButtonPane>

            <div className={styles.spacer}></div>
            <OnSaveInfoMessage />

            <Button onClick={navigateClickHandeler} endIcon={<ArrowForward />} size="small">
                К просмотру
            </Button>
        </>
    );
};

export default EditRadarPanel;
