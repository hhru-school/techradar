import { FC } from 'react';

import Layout from '../../../../components/layout/Layout';
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

    return (
        <div className={styles.background}>
            <Layout>
                <div className={styles.container}>
                    {isNewRadar && <NewRadarPanel />}
                    {isEditVersion && <EditRadarPanel />}
                </div>
            </Layout>
        </div>
    );
};

export default MainEditPanel;
