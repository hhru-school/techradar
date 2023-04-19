import { FC } from 'react';

import { clearActiveBlip, setActiveBlip } from '../../../../store/activeBlipSlice';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';

import styles from './legend.module.less';

type Props = { id: number; name: string };

const LegendItem: FC<Props> = ({ id, name }) => {
    const activeId = useAppSelector((state) => state.activeBlip.id);

    const dispatch = useAppDispatch();

    const mouseEnterHandler = () => {
        dispatch(setActiveBlip(id));
    };

    const mouseLeaveHandler = () => {
        dispatch(clearActiveBlip());
    };

    return (
        <li
            className={activeId === id ? `${styles.itemActive} ${styles.item}` : styles.item}
            onMouseEnter={mouseEnterHandler}
            onMouseLeave={mouseLeaveHandler}
        >{`${id}. ${name}`}</li>
    );
};

export default LegendItem;
