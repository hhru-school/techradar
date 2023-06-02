import { FC } from 'react';

import { ConstructorMode } from '../../../../store/editRadarSlice';
import EditRadarPanel from './EditRadarPanel';
import NewRadarPanel from './NewRadarPanel';

import styles from './mainEditPanel.module.less';

type Props = {
    mode: ConstructorMode;
};

const MainEditPanel: FC<Props> = ({ mode }) => {
    const isNewRadar = mode === ConstructorMode.NewRadarCreation;
    const isEditVersion = mode === ConstructorMode.VersionEditing;
    const isNewVersion = mode === ConstructorMode.NewVersionCreation;

    return (
        <div className={styles.container}>
            {isNewRadar && <NewRadarPanel />}
            {(isEditVersion || isNewVersion) && <EditRadarPanel />}
        </div>
    );
};

export default MainEditPanel;
