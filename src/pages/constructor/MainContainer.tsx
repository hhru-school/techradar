import { FC } from 'react';

import Layout from '../../components/layout/Layout';
import { RadarInterface } from '../../components/radar/types';
import RadarContainer from './RadarContainer';
import EditableLegend from './legend/EditableLegend';
import RadarLogContainer from './log/RadarLogContainer';

import styles from './constructor.module.less';

type Props = {
    radar: RadarInterface;
};

const MainContainer: FC<Props> = ({ radar }) => {
    return (
        <Layout>
            <div className={styles.main}>
                <EditableLegend radar={radar} />
                <RadarContainer radar={radar} />
                <RadarLogContainer />
            </div>
        </Layout>
    );
};

export default MainContainer;
