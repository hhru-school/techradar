import { FC } from 'react';

import { ReactComponent as AlertCircle } from './icons/alert-circle.svg';
import { ReactComponent as Other } from './icons/other.svg';
import { ReactComponent as PageNotFound } from './icons/pageNotFound.svg';

import styles from './error.module.less';

type Props = { errorStatus: number | string | null };

enum Message {
    PageNotFound = 'Page not found',
    Unauthorized = 'Необходимо авторизироваться',
    Other = 'Oooops!.. Something went wrong',
}

const svgStyle = { width: 100, height: 100 };

const ErrorMessage: FC<Props> = ({ errorStatus }) => {
    let message = Message.Other;
    let svg = <Other style={svgStyle} />;

    switch (errorStatus) {
        case 404: {
            message = Message.PageNotFound;
            svg = <PageNotFound style={svgStyle} />;
            break;
        }
        case 401: {
            message = Message.Unauthorized;
            svg = <AlertCircle style={svgStyle} />;
            break;
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
