import { FC } from 'react';

import Layout from '../../components/layout/Layout';
import { RadarInterface } from '../../components/radar/types';
import RadarContainer from './RadarContainer';
import RadarLogContainer from './log/RadarLogContainer';
import TableContainer from './table/TableContainer';

import styles from './constructor.module.less';

type Props = {
    radar: RadarInterface;
};

const MainContainer: FC<Props> = ({ radar }) => {
    return (
        <Layout>
            <div className={styles.main}>
                <RadarContainer radar={radar} />
                <TableContainer radar={radar} />
                <RadarLogContainer />
            </div>
        </Layout>
    );
};

export default MainContainer;
