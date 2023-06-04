import { FC } from 'react';
import { Button } from '@mui/material';

import { setShowSaveRadarDialog } from '../../../../store/editRadarSlice';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import PropertiesContainer from './PropertiesContainer';

import styles from './mainEditPanel.module.less';

const NewRadarPanel: FC = () => {
    const dispatch = useAppDispatch();

    const radarName = useAppSelector((state) => state.editRadar.radar.name);
    const versionName = useAppSelector((state) => state.editRadar.version.name);

    const saveBtnClickHandler = () => {
        dispatch(setShowSaveRadarDialog(true));
    };

    return (
        <>
            <PropertiesContainer radarName={radarName} versionName={versionName} />
            <div className={styles.spacer}></div>
            <Button variant="contained" color="primary" onClick={saveBtnClickHandler}>
                Сохранить
            </Button>
        </>
    );
};

export default NewRadarPanel;
