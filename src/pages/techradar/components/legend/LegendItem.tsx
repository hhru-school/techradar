import { FC } from 'react';

import { clearActiveBlip, setActiveBlip, setOpenDescription } from '../../../../store/activeBlipSlice';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';

import styles from './legend.module.less';

type Props = { id: number; name: string; description?: string };

const LegendItem: FC<Props> = ({ id, name, description = '' }) => {
    const activeId = useAppSelector((state) => state.activeBlip.id);
    const isOpen = useAppSelector((state) => state.activeBlip.openDescription);
    const dispatch = useAppDispatch();

    const mouseEnterHandler = () => {
        dispatch(setActiveBlip(id));
    };

    const mouseLeaveHandler = () => {
        dispatch(clearActiveBlip());
    };

    const onClickHandler = () => {
        dispatch(setOpenDescription(!isOpen));
    };

    const display = activeId === id && isOpen ? 'block' : 'none';

    return (
        <li className={styles.item} onMouseEnter={mouseEnterHandler} onMouseLeave={mouseLeaveHandler}>
            <div
                onClick={onClickHandler}
                className={
                    activeId === id
                        ? `${styles.accordionSummaryActive} ${styles.accordionSummary}`
                        : styles.accordionSummary
                }
            >
                {`${id}. ${name}`}
            </div>
            <div className={styles.accordionDescription} style={{ display }}>
                {description}
            </div>
        </li>
    );
};

export default LegendItem;
