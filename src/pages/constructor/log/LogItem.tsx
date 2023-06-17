import { FC, useEffect, useCallback } from 'react';
import classNames from 'classnames';

import { IndexBlipEventApi } from '../../../api/types';
import { openBlipEventModal, setNewBlipEventId } from '../../../store/editRadarSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';

import styles from './item.module.less';

type Props = {
    blipEvent: IndexBlipEventApi;
};

const formatDate = (dateStr: string): string => new Date(dateStr).toLocaleString().slice(0, -3);

const LogItem: FC<Props> = ({ blipEvent }) => {
    const newBlipEventId = useAppSelector((state) => state.editRadar.newBlipEventId);
    const dispatch = useAppDispatch();

    const isNew = blipEvent.id === newBlipEventId;
    const isInit = blipEvent.parentId === null;

    const clickHandler = useCallback(() => {
        dispatch(openBlipEventModal(blipEvent));
    }, [dispatch, blipEvent]);

    const classes = classNames(styles.container, { [styles.new]: isNew, [styles.init]: isInit });

    useEffect(() => {
        setTimeout(() => {
            dispatch(setNewBlipEventId(-1));
        }, 1000);
    }, [isNew, dispatch]);

    return (
        <li className={classes} onClick={isInit ? undefined : clickHandler}>
            {blipEvent.drawInfo && <div className={styles.date}>{blipEvent.drawInfo}</div>}
            <div className={styles.date}>{formatDate(blipEvent.creationTime)}</div>
            <div className={styles.name}> {blipEvent.blip?.name} </div>
        </li>
    );
};

export default LogItem;
