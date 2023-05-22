import { FC } from 'react';

import { clearActiveBlip, setActiveBlip, setOpenDescription } from '../../../../store/activeBlipSlice';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import DropDown from './DropDown';

import styles from './legend.module.less';

type Props = {
    id: number;
    name: string;
    description: string | null;
};

const LegendItem: FC<Props> = ({ id, name, description }) => {
    const activeId = useAppSelector((state) => state.activeBlip.id);
    const open = useAppSelector((state) => state.activeBlip.openDescription);

    const dispatch = useAppDispatch();

    const onClickHandler = () => {
        dispatch(setActiveBlip(id));
        dispatch(setOpenDescription(!open));
    };

    const onMouseEnterHandler = () => {
        dispatch(setActiveBlip(id));
    };

    const onMouseLeaveHandler = () => {
        dispatch(clearActiveBlip());
    };

    return (
        <>
            <li
                onClick={onClickHandler}
                onMouseEnter={onMouseEnterHandler}
                onMouseLeave={onMouseLeaveHandler}
                className={styles.item}
            >
                <DropDown
                    title={`${id}. ${name}`}
                    details={description}
                    open={open && activeId === id}
                    active={activeId === id}
                />
            </li>
        </>
    );
};

export default LegendItem;
