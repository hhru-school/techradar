import React, { FC } from 'react';
import { LinearProgress } from '@mui/material';

import NavTabs from './NavTabs';

import styles from './navTabs.module.less';

type Props = {
    radars?: { id: number; name: string }[];
    radarId: number;
    companyId: number;
    isLoading?: boolean;
};

const NavTabsContainer: FC<Props> = ({ radars, radarId, companyId, isLoading = false }) => {
    return (
        <div className={styles.container}>
            {!isLoading && radars && <NavTabs radars={radars} radarId={radarId} companyId={companyId} />}
            {isLoading && <LinearProgress className={styles.bar} />}
        </div>
    );
};

export default NavTabsContainer;
