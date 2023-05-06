import { FC, MouseEvent, memo, useCallback, useMemo } from 'react';
import Tooltip from '@mui/material/Tooltip/Tooltip';

import { clearActiveBlip, setActiveBlip } from '../../store/activeBlipSlice';
import { dropBlipToSegment, setDraggingBlip } from '../../store/editRadarSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { store } from '../../store/store';
import { RadarComponentVariant } from './types';

import styles from './blip.module.less';

type Props = {
    id: number;
    name: string;
    r: number;
    x: number;
    y: number;
    variant?: RadarComponentVariant;
};

const mouseUpHandler = () => {
    const segment = store.getState().editRadar.activeSegment;
    store.dispatch(dropBlipToSegment(segment));
    store.dispatch(clearActiveBlip());
    document.removeEventListener('mosedown', mouseUpHandler);
};

const RadarBlip: FC<Props> = ({ id, name, x, y, r, variant = RadarComponentVariant.Demonstrative }) => {
    const activeId = useAppSelector((state) => state.activeBlip.id);

    const isTransforming = useAppSelector((state) => state.activeSector.isTransforming);

    const dispatch = useAppDispatch();

    const isActive = activeId === id;

    const mouseEnterHandler = useCallback(() => {
        dispatch(setActiveBlip(id));
    }, [dispatch, id]);

    const mouseLeaveHandler = useCallback(() => {
        dispatch(clearActiveBlip());
    }, [dispatch]);

    const onClickHandler = (event: React.SyntheticEvent) => {
        event.stopPropagation();
    };
    // Drag'n'Drop logic

    const isDragging = useAppSelector((state) => state.editRadar.isDragging);
    const draggingId = useAppSelector((state) => state.editRadar.editingBlipGeometry?.id);

    const mouseDownHandler = useCallback(
        (event: MouseEvent) => {
            event.preventDefault();
            if (variant === RadarComponentVariant.Editable) {
                const bbox = (event.target as HTMLElement).getBoundingClientRect();
                const x = event.clientX - bbox.left;
                const y = event.clientY - bbox.top;

                dispatch(setDraggingBlip({ x, y, r, id }));
                document.addEventListener('mouseup', mouseUpHandler);
            }
        },
        [variant, r, id, dispatch]
    );

    // /end of Drag'n'Drop logic

    let blipClasses = '';

    if (variant === RadarComponentVariant.Demonstrative) {
        blipClasses = styles.blipDemonsrative;
    }

    if (variant === RadarComponentVariant.Editable) {
        blipClasses = styles.blipEditable;
    }

    const blipFieldClasses = isActive ? styles.blipFieldActive : styles.blipField;
    const blipTextClasses = isActive ? styles.blipTextActive : styles.blipText;

    const strokeWidth = r / 8;

    const blip = useMemo(
        () => (
            <g
                className={blipClasses}
                onMouseEnter={isDragging ? undefined : mouseEnterHandler}
                onMouseLeave={isDragging ? undefined : mouseLeaveHandler}
                onClick={onClickHandler}
                onMouseDown={mouseDownHandler}
                pointerEvents={isDragging ? 'none' : 'auto'}
                opacity={id === draggingId ? 0.5 : 1}
            >
                <circle cx={x} cy={y} r={r - strokeWidth} strokeWidth={strokeWidth} className={blipFieldClasses} />
                <text
                    x={x}
                    y={y}
                    fontSize={`${0.7 * 2 * r}px`}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className={blipTextClasses}
                >
                    {id}
                </text>
            </g>
        ),
        [
            id,
            x,
            y,
            r,
            strokeWidth,
            blipClasses,
            blipFieldClasses,
            blipTextClasses,
            draggingId,
            isDragging,
            mouseDownHandler,
            mouseEnterHandler,
            mouseLeaveHandler,
        ]
    );

    if (isTransforming || isDragging) {
        return blip;
    }

    return (
        <Tooltip key={Number(isTransforming)} open={isActive && !isTransforming} title={name} arrow>
            {blip}
        </Tooltip>
    );
};

export default memo(RadarBlip);
