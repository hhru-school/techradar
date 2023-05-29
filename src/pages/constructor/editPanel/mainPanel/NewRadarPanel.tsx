import { FC } from 'react';
import { Button } from '@mui/material';

import { setShowSaveRadarDialog } from '../../../../store/editRadarSlice';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import EditCredetialContainer from '../EditCredetionalContainer';

import styles from './mainEditPanel.module.less';

const NewRadarPanel: FC = () => {
    const dispatch = useAppDispatch();

    const name = useAppSelector((state) => state.editRadar.radar.name);
    const currentVersionName = useAppSelector((state) => state.editRadar.currentVersionName);

    const saveBtnClickHandler = () => {
        dispatch(setShowSaveRadarDialog(true));
    };

    return (
        <>
            <EditCredetialContainer label={'Название радара'} value={name} />
            <EditCredetialContainer label={'Версия'} value={currentVersionName} />
            <div className={styles.spacer}></div>
            <Button variant="contained" color="primary" onClick={saveBtnClickHandler}>
                Сохранить
            </Button>
        </>
    );
};

export default NewRadarPanel;
