import { FC, useEffect, useRef } from 'react';

import { clearActiveBlip, setActiveBlip, setOpenDescription, setScrollOffset } from '../../../../store/activeBlipSlice';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { Bbox, getScrollOffset } from '../../../constructor/legend/utils';
import DropDown from './DropDown';

import styles from './legend.module.less';

const additionalOffset = 20;

type Props = {
    id: number;
    label: string;
    description: string | null;
};

const LegendItem: FC<Props> = ({ id, label, description }) => {
    const activeId = useAppSelector((state) => state.activeBlip.id);
    const open = useAppSelector((state) => state.activeBlip.openDescription);

    const isActive = activeId === id;

    const dispatch = useAppDispatch();

    const containerBbox = useAppSelector((state) => state.activeBlip.legendBbox);

    const scrollRef = useRef<HTMLLIElement>(null);

    useEffect(() => {
        if (isActive) {
            const itemBbox = scrollRef.current?.getBoundingClientRect() as Bbox;
            const scrollOffset = getScrollOffset(containerBbox, itemBbox, additionalOffset);
            dispatch(setScrollOffset(scrollOffset));
        }
    }, [isActive, dispatch, containerBbox]);

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
                ref={scrollRef}
            >
                <DropDown title={label} details={description} open={open && isActive} active={isActive} />
            </li>
        </>
    );
};

export default LegendItem;
