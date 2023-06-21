import { FC, useEffect } from 'react';
import InfoIcon from '@mui/icons-material/Info';
import classNames from 'classnames';

import { setShowSaveInfoMessage } from '../../../store/editRadarSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';

import styles from './onSaveInfoMessage.module.less';

const message = 'СОХРАНЕНО';

const OnSaveInfoMessage: FC = () => {
    const isVisible = useAppSelector((state) => state.editRadar.showSaveInfoMessage);

    const dispatch = useAppDispatch();

    const classes = classNames(styles.container, {
        [styles.hidden]: !isVisible,
    });

    useEffect(() => {
        setTimeout(() => {
            dispatch(setShowSaveInfoMessage(false));
        }, 2000);
    }, [isVisible, dispatch]);

    return (
        <div className={classes}>
            <InfoIcon className={styles.content} />
            {message}
        </div>
    );
};

export default OnSaveInfoMessage;
