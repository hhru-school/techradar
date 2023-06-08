import { FC, memo, useCallback, useEffect, useRef, useState } from 'react';
import { useDrag } from 'react-dnd';
import classNames from 'classnames';

import { Blip } from '../../../components/radar/types';
import { clearActiveBlip, setActiveBlip, setScrollOffset } from '../../../store/activeBlipSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import LegendItemEditMenu from './LegendItemEditMenu';
import { Bbox, getScrollOffset } from './utils';

import styles from './legend.module.less';

type Props = {
    blip: Blip;
    isSearching: boolean;
};

const additionalOffset = 20;

const EditableLegendItem: FC<Props> = ({ blip, isSearching = false }) => {
    const activeBlipId = useAppSelector((state) => state.activeBlip.id);

    const [{ isDragging }, dragRef] = useDrag({
        type: 'blip',
        item: blip,
        canDrag: () => !isSearching,
        collect: (monitor) => {
            return {
                isDragging: monitor.isDragging(),
            };
        },
    });

    const isActive = activeBlipId === blip.id;

    const scrollRef = useRef<HTMLDivElement>(null);

    const containerBbox = useAppSelector((state) => state.activeBlip.legendBbox);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (isActive) {
            const itemBbox = scrollRef.current?.getBoundingClientRect() as Bbox;
            const scrollOffset = getScrollOffset(containerBbox, itemBbox, additionalOffset);
            dispatch(setScrollOffset(scrollOffset));
        }
    }, [isActive, dispatch, containerBbox]);

    const [openEditMenu, setOpenEditMenu] = useState(false);

    const onMouseEnterHandler = useCallback(() => {
        if (!isDragging) {
            setOpenEditMenu(true);
        }
        dispatch(setActiveBlip(blip.id));
    }, [dispatch, isDragging, blip]);

    const onMouseLeaveHandler = useCallback(() => {
        setOpenEditMenu(false);
        dispatch(clearActiveBlip());
    }, [dispatch]);

    const onMouseDownHandler = useCallback(() => {
        setOpenEditMenu(false);
    }, [setOpenEditMenu]);

    const contentClasses = classNames(styles.item, {
        [styles.itemActive]: isActive,
    });

    return (
        <li
            onMouseEnter={onMouseEnterHandler}
            onMouseLeave={onMouseLeaveHandler}
            onMouseDown={onMouseDownHandler}
            className={contentClasses}
            ref={dragRef}
        >
            <div ref={scrollRef}> {`${blip.label}. ${blip.name}`}</div>
            {openEditMenu && <LegendItemEditMenu id={blip.id} />}
        </li>
    );
};

export default memo(EditableLegendItem);
