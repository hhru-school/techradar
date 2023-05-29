import { FC } from 'react';

import { RadarInterface } from '../../components/radar/types';
import EditContainer from './EditContainer';
import RadarLogContainer from './log/RadarLogConstainer';
import TableContainer from './table/TableContainer';

import styles from './constructor.module.less';

type Props = {
    radar: RadarInterface;
};

const MainContainer: FC<Props> = ({ radar }) => {
    return (
        <div className={styles.main}>
            <EditContainer radar={radar} />
            <TableContainer radar={radar} />
            <RadarLogContainer />
        </div>
    );
};

export default MainContainer;
