import { FC } from 'react';
import { Button } from '@mui/material';

import { useSaveNewRadarMutation } from '../../../api/companyRadarsApi';
import { formatCreateRadarData } from '../../../api/radarApiUtils';
import { useAppSelector } from '../../../store/hooks';
import EditCredetialContainer from '../editPanel/EditCredetionalContainer';
import { useCurrentRadar } from '../hooks';

import styles from './mainEditPanel.module.less';

const MainEditPanel: FC = () => {
    const radarName = useAppSelector((state) => state.editRadar.radarName);
    const radarVersion = useAppSelector((state) => state.editRadar.radarVersion);

    const radar = useCurrentRadar();

    const [saveRadar] = useSaveNewRadarMutation();

    const saveBtnClickHandler = async () => {
        const newRadar = formatCreateRadarData({ ...radar, authorId: 1, companyId: 1, name: radarName });
        await saveRadar(newRadar);
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
