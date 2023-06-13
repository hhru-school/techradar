import { FC } from 'react';
import { Button } from '@mui/material';

import { setShowSaveRadarDialog } from '../../../../store/editRadarSlice';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import RadarBaseEditPanel from '../editFieldPanel/RadarBaseEditPanel';
import PropertiesContainer from './PropertiesContainer';

import styles from './mainEditPanel.module.less';

const NewRadarPanel: FC = () => {
    const dispatch = useAppDispatch();

    const { name, sectors, rings } = useAppSelector((state) => state.editRadar.radar);
    const versionName = useAppSelector((state) => state.editRadar.version.name);

    const saveBtnClickHandler = () => {
        dispatch(setShowSaveRadarDialog(true));
    };

    return (
        <>
            <PropertiesContainer radarName={name} versionName={versionName} />
            <div className={styles.spacer}></div>
            <RadarBaseEditPanel sectors={sectors} rings={rings} />
            <div className={styles.constSpacer}></div>
            <Button variant="contained" color="primary" onClick={saveBtnClickHandler}>
                Сохранить
            </Button>
        </>
    );
};

export default NewRadarPanel;
