import { FC, ReactNode } from 'react';

import styles from './layout.module.less';

type Props = { children: ReactNode };

const Layout: FC<Props> = ({ children }) => {
    return (
        <div className={styles.layout}>
            <div className={styles.container}>{children}</div>
        </div>
    );
};

export default Layout;
