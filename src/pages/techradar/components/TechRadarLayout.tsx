import { FC, ReactNode } from 'react';

import styles from './layout.module.less';

type Props = { children: ReactNode };

const TechRadarLayout: FC<Props> = ({ children }) => {
    return <div className={styles.layout}>{children}</div>;
};

export default TechRadarLayout;
