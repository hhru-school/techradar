import { FC } from 'react';

import EditContainer from './EditContainer';
import MainEditPanel from './editPanel/MainEditPanel';
import { useCurrentRadar } from './hooks';
import Modals from './modals/Modals';
import TableContainer from './table/TableContainer';

import styles from './constructor.module.less';

const Constructor: FC = () => {
    const radar = useCurrentRadar();

    return (
        <>
            <Modals />
            <MainEditPanel />
            <div className={styles.main}>
                <EditContainer radar={radar} />
                <TableContainer radar={radar} />
            </div>
        </>
    );
};

export default Constructor;
