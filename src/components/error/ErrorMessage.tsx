import { FC } from 'react';

import styles from './error.module.less';

type Props = { errorStatus: number };

const ErrorMessage: FC<Props> = () => {
    return (
        <div className={styles.container}>
            <div className={styles.imageContainer}></div>
            <div className={styles.messageContainer}></div>
        </div>
    );
};

export default ErrorMessage;
