import { FC } from 'react';
import { Button } from '@mui/material';

import { setShowSaveRadarDialog } from '../../../store/editRadarSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import EditCredetialContainer from '../editPanel/EditCredetionalContainer';

import styles from './mainEditPanel.module.less';

const MainEditPanel: FC = () => {
    const radarName = useAppSelector((state) => state.editRadar.radarName);
    const radarVersion = useAppSelector((state) => state.editRadar.radarVersion);

    // const radar = useCurrentRadar();

    const dispatch = useAppDispatch();

    // const [saveRadar, { data }] = useSaveNewRadarMutation();

    const saveBtnClickHandler = () => {
        dispatch(setShowSaveRadarDialog(true));
        // const newRadar = formatCreateRadarData({ ...radar, authorId: 1, companyId: 1, name: radarName });
        // await saveRadar(newRadar);
    };

    return (
        <div className={styles.container}>
            <EditCredetialContainer label={'Название радара'} value={radarName} />
            <EditCredetialContainer label={'Версия'} value={radarVersion} />
            <div className={styles.spacer}></div>
            <Button variant="contained" color="primary" onClick={saveBtnClickHandler}>
                Сохранить
            </Button>
            <Button variant="contained" color="success">
                Опубликовать
            </Button>
        </div>
    );
};

export default MainEditPanel;
