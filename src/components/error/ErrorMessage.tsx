import { FC } from 'react';

import { ReactComponent as Other } from './icons/other.svg';
import { ReactComponent as PageNotFound } from './icons/pageNotFound.svg';

import styles from './error.module.less';

type Props = { errorStatus: number | string };

enum Message {
    PageNotFound = 'Page not found',
    Other = 'Oooops!.. Something went wrong',
}

const ErrorMessage: FC<Props> = ({ errorStatus }) => {
    let message = Message.Other;
    let svg = <Other />;

    switch (errorStatus) {
        case 404: {
            message = Message.PageNotFound;
            svg = <PageNotFound />;
        }
    }

    return (
        <div className={styles.layout}>
            <div className={styles.container}>
                <div className={styles.imageContainer}>{svg}</div>
                <div className={styles.messageContainer}>{message}</div>
            </div>
        </div>
    );
};

export default ErrorMessage;
