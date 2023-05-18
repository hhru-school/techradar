import { FC, memo, useEffect, useRef } from 'react';
import { useDrag } from 'react-dnd';
import classNames from 'classnames';

import { Blip } from '../../../components/radar/types';
import { clearActiveBlip, setActiveBlip, setScrollOffset } from '../../../store/activeBlipSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';

import styles from './legend.module.less';

type Props = {
    blip: Blip;
    isSearching: boolean;
};

const EditableLegendItem: FC<Props> = ({ blip, isSearching = false }) => {
    const activeBlipId = useAppSelector((state) => state.activeBlip.id);

    const dragRef = useDrag({
        type: 'blip',
        item: blip,
        canDrag: () => !isSearching,
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })[1];

    const isActive = activeBlipId === blip.id;

    const scrollRef = useRef<HTMLDivElement>(null);

    const containerBbox = useAppSelector((state) => state.activeBlip.legendBbox);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (isActive) {
            const itemBbox = scrollRef.current?.getBoundingClientRect();
            let scrollOffset = 0;
            if (containerBbox && itemBbox) {
                if (itemBbox.bottom < containerBbox.top) {
                    scrollOffset = itemBbox.top - containerBbox.top - 20;
                }
                if (itemBbox.top > containerBbox.bottom) {
                    scrollOffset = itemBbox.bottom - containerBbox.bottom + 20;
                }
            }
            dispatch(setScrollOffset(scrollOffset));
        }
    }, [isActive, dispatch, containerBbox]);

    const onMouseEnterHandler = () => {
        dispatch(setActiveBlip(blip.id));
    };

    const onMouseLeaveHandler = () => {
        dispatch(clearActiveBlip());
    };

    const contentClasses = classNames(styles.item, {
        [styles.itemActive]: isActive,
    });

    return (
        <li
            onMouseEnter={onMouseEnterHandler}
            onMouseLeave={onMouseLeaveHandler}
            className={contentClasses}
            ref={dragRef}
        >
            <div ref={scrollRef}> {`${blip.id}. ${blip.name}`}</div>
        </li>
    );
};

export default memo(EditableLegendItem);
