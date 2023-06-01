import { FC, useCallback } from 'react';
import { Button } from '@mui/material';

import { setShowSwitchReleaseModal } from '../../../../store/editRadarSlice';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import EditCredetialContainer from '../EditCredetionalContainer';
import VersionStatusContainer from '../VersionStatusContainer';

import styles from './mainEditPanel.module.less';

const EditRadarPanel: FC = () => {
    const dispatch = useAppDispatch();

    const name = useAppSelector((state) => state.editRadar.radar.name);
    const version = useAppSelector((state) => state.editRadar.version);

    const isReleased = version?.release;

    const clickHandler = useCallback(() => {
        dispatch(setShowSwitchReleaseModal(true));
    }, [dispatch]);

    return (
        <>
            <EditCredetialContainer label={'Название радара'} value={name} />
            {version && <EditCredetialContainer label={'Версия'} value={version.name} />}
            <div className={styles.spacer}></div>
            {version && <VersionStatusContainer release={version?.release} />}
            {isReleased ? (
                <Button variant="outlined" color="error" onClick={clickHandler}>
                    Снять с публикации
                </Button>
            ) : (
                <Button variant="contained" color="success" onClick={clickHandler}>
                    Опубликовать
                </Button>
            )}
        </>
    );
};

export default EditRadarPanel;
