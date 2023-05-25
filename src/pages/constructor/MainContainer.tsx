import { FC } from 'react';

import { BasicRadarData } from '../../api/radarApiUtils';
import EditContainer from './EditContainer';
import TableContainer from './table/TableContainer';

import styles from './constructor.module.less';

type Props = {
    radar: BasicRadarData;
};

const MainContainer: FC<Props> = ({ radar }) => {
    return (
        <div className={styles.main}>
            <EditContainer radar={radar} />
            <TableContainer radar={radar} />
        </div>
    );
};

export default MainContainer;
