import { FC } from 'react';

import styles from './blipEventModal.module.less';

type Props = {
    comment: string;
};

const CommentField: FC<Props> = ({ comment }) => {
    if (!comment) return <div className={styles.emptyComment}>Нет комментария</div>;
    return <div className={styles.comment}>{comment}</div>;
};

export default CommentField;
