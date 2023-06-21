import { FC, ReactNode } from 'react';

import styles from './editPropertyButtonPane.module.less';

type Props = { children: ReactNode; clickHandler: () => void };

const EditPropertyButtonPane: FC<Props> = ({ children, clickHandler }) => {
    return (
        <div className={styles.main} onClick={clickHandler}>
            {children}
        </div>
    );
};

export default EditPropertyButtonPane;
