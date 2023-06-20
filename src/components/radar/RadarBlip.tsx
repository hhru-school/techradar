import { FC, MouseEvent, memo, useCallback, useMemo } from 'react';
import Tooltip from '@mui/material/Tooltip/Tooltip';
import classNames from 'classnames';

import { mouseUpHandler } from '../../pages/constructor/utils';
import { clearActiveBlip, setActiveBlip } from '../../store/activeBlipSlice';
import { setDraggingBlip } from '../../store/editRadarSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import RadarBlipShape from './RadarBlipShape';
import { defaultBlipColor, getlabelColor } from './styleConfig';
import { DrawInfo, RadarVariant } from './types';

import styles from './blip.module.less';

type Props = {
    id: number;
    label: string | number;
    name: string;
    r: number;
    x: number;
    y: number;
    variant?: RadarVariant;
    drawInfo?: DrawInfo;
    color?: string;
};

const RadarBlip: FC<Props> = ({
    id,
    label,
    name,
    x,
    y,
    r,
    variant = RadarVariant.Demonstrative,
    drawInfo,
    color = defaultBlipColor,
}) => {
    const activeId = useAppSelector((state) => state.activeBlip.id);

    const isTransforming = useAppSelector((state) => state.displayRadar.isTransforming);

    const dispatch = useAppDispatch();

    const isActive = activeId === id;
    const isDemonsrtative = variant === RadarVariant.Demonstrative;
    const isEditable = variant === RadarVariant.Editable;

    const mouseEnterHandler = useCallback(() => {
        dispatch(setActiveBlip(id));
    }, [dispatch, id]);

    const mouseLeaveHandler = useCallback(() => {
        dispatch(clearActiveBlip());
    }, [dispatch]);

    const onClickHandler = (event: React.SyntheticEvent) => {
        event.stopPropagation();
    };

    const blipClasses = classNames({
        [styles.blipDemonsrative]: isDemonsrtative,
        [styles.blipEditable]: isEditable,
    });

    const blipTextClasses = classNames({
        [styles.blipTextActive]: isActive,
        [styles.blipText]: !isActive,
    });

    const isDragging = useAppSelector((state) => state.editRadar.isDragging);
    const draggingId = useAppSelector((state) => state.editRadar.blipAsset?.id);

    const mouseDownHandler = useCallback(
        (event: MouseEvent) => {
            event.preventDefault();
            if (variant === RadarVariant.Editable) {
                const bbox = (event.target as HTMLElement).getBoundingClientRect();
                const x = event.pageX;
                const y = event.pageY;
                const offsetX = x - bbox.left;
                const offsetY = y - bbox.top;
                dispatch(setDraggingBlip({ x, y, offsetX, offsetY, r, id }));
                document.addEventListener('mouseup', mouseUpHandler);
            }
        },
        [variant, r, id, dispatch]
    );

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
                <RadarBlipShape x={x} y={y} r={r} drawInfo={drawInfo} isActive={isActive} color={color} />
                <text
                    x={x}
                    y={y}
                    fontSize={`${0.6 * 2 * r}px`}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className={blipTextClasses}
                    fill={getlabelColor(color)}
                >
                    {label}
                </text>
            </g>
        ),
        [
            id,
            label,
            x,
            y,
            r,
            blipClasses,
            isActive,
            blipTextClasses,
            draggingId,
            isDragging,
            mouseDownHandler,
            mouseEnterHandler,
            mouseLeaveHandler,
            drawInfo,
            color,
        ]
    );

    if ((isTransforming && isDemonsrtative) || isDragging) {
        return blip;
    }

    return (
        <Tooltip key={isDemonsrtative ? Number(isTransforming) : undefined} open={isActive} title={name} arrow>
            {blip}
        </Tooltip>
    );
};

export default memo(RadarBlip);
