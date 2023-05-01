import { FC } from 'react';

import styles from './error.module.less';

type Props = { errorStatus: number };

enum Url {
    PageNotFound = './icons/404.svg',
    Other = './icons/other.svg',
}

enum Message {
    PageNotFound = 'Page not found',
    Other = 'Oooops!.. Something went wrong',
}

const ErrorMessage: FC<Props> = ({ errorStatus }) => {
    let message = Message.Other;
    let url = Url.Other;

    switch (errorStatus) {
        case 404: {
            message = Message.PageNotFound;
            url = Url.PageNotFound;
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.imageContainer}>
                <img src={url} alt={`Error ${errorStatus}`} />
            </div>
            <div className={styles.messageContainer}>{message}</div>
        </div>
    );
};

export default ErrorMessage;
