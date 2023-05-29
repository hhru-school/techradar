import { FC } from 'react';

import { ConstructorMode } from '../../../../store/editRadarSlice';
import DisplayBlipEventPanel from './DisplayBlipEventPanel';
import EditRadarPanel from './EditRadarPanel';
import NewRadarPanel from './NewRadarPanel';

import styles from './mainEditPanel.module.less';

type Props = {
    mode: ConstructorMode;
};

const MainEditPanel: FC<Props> = ({ mode }) => {
    const isNewRadar = mode === ConstructorMode.NewRadarCreation;
    const isEditVersion = mode === ConstructorMode.VersionEditing;
    const isBlipEventDisplay = mode === ConstructorMode.DisplayEvent;

    return (
        <div className={styles.container}>
            {isNewRadar && <NewRadarPanel />}
            {isEditVersion && <EditRadarPanel />}
            {isBlipEventDisplay && <DisplayBlipEventPanel />}
        </div>
    );
};

export default MainEditPanel;
