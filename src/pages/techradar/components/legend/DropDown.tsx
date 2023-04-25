import { FC } from 'react';

import styles from './dropdown.module.less';

type Props = {
    title: string;
    details: string | null;
    open?: boolean;
    active?: boolean;
};

const DropDown: FC<Props> = ({ title, details, open = false, active = false }) => {
    return (
        <div className={styles.container}>
            <div className={active ? styles.titleActive : styles.title}>{title}</div>
            {details && (
                <div className={open ? styles.detailOpened : styles.detailClosed}>
                    <div className={styles.detailContent}>{details}</div>
                </div>
            )}
        </div>
    );
};

export default DropDown;
