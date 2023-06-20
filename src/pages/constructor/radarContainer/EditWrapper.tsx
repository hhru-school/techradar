import { FC, memo, useCallback, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import Radar from '../../../components/radar/Radar';
import RadarBlip from '../../../components/radar/RadarBlip';
import { defaultBlipRadius } from '../../../components/radar/styleConfig';
import { RadarInterface, RadarVariant } from '../../../components/radar/types';
import { setDraggingBlip, setIsCreating } from '../../../store/editRadarSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { blipRadius } from '../config';
import { mouseUpHandler } from '../utils';
import BlipGenerator from './BlipGenerator';
import Cursor from './Cursor';

import styles from './wrapper.module.less';

type Position = { x: number; y: number };

type Props = {
    radar: RadarInterface;
};

const scrollOffset = 50;
const scrollValue = 300;
const pageBorderOffset = 10;

function getBBox(el: HTMLElement) {
    const rect = el.getBoundingClientRect();
    return {
        left: rect.left + window.scrollX,
        top: rect.top + window.scrollY,
    };
}

const EditWrapper: FC<Props> = ({ radar }) => {
    const blipAsset = useAppSelector((state) => state.editRadar.blipAsset);
    const onDropEvent = useAppSelector((state) => state.editRadar.eventSuggest);
    const showEditIcon = useAppSelector((state) => state.editRadar.showEditIcon);

    const dispatch = useAppDispatch();

    const ref = useRef<HTMLDivElement>(null);

    const [bbox, setBbox] = useState<{ left: number; top: number }>();

    const [position, setPosition] = useState<Position | null>(null);

    const [scroll, setScroll] = useState(0);

    const mouseMoveHandler = useCallback(
        (event: React.MouseEvent) => {
            if (bbox) {
                // автоскролл если потянутый элемент внизу экрана и ещё есть место куда пролистывать
                if (
                    event.clientY >= window.innerHeight - scrollOffset &&
                    event.pageY < document.body.offsetHeight - pageBorderOffset
                ) {
                    setScroll(scrollValue);
                }

                // а это если элемент вверху
                if (event.clientY <= scrollOffset && event.clientY !== event.pageY) {
                    setScroll(-scrollValue);
                }

                let x = event.pageX - bbox.left;
                let y = event.pageY - bbox.top;
                if (blipAsset) {
                    x -= blipAsset.offsetX;
                    y -= blipAsset.offsetY;
                }
                setPosition({ x, y });
            }
        },
        [bbox, blipAsset]
    );

    const mouseDownHandler = useCallback(
        (event: React.MouseEvent) => {
            if (bbox) {
                const r = defaultBlipRadius;
                const x = event.pageX - bbox.left;
                const y = event.pageY - bbox.top;
                dispatch(setDraggingBlip({ id: -1, label: '+', r, x, y, offsetX: r / 2, offsetY: r / 2 }));
                dispatch(setIsCreating());
                document.addEventListener('mouseup', mouseUpHandler);
                setPosition({ x, y });
            }
        },
        [bbox, dispatch]
    );

    useEffect(() => {
        if (ref.current) {
            const bbox = getBBox(ref.current);
            setBbox(bbox);
        }

        // setBbox(ref.current?.getBoundingClientRect());
        if (!blipAsset || !showEditIcon) {
            setPosition(null);
        }
    }, [blipAsset, showEditIcon]);

    useEffect(() => {
        if (blipAsset) {
            window.scrollBy({
                top: scroll,
                behavior: 'smooth',
            });
        }
    }, [scroll, blipAsset]);

    useEffect(() => {
        if (!blipAsset) setScroll(0);
        return () => {
            setScroll(0);
        };
    }, [blipAsset]);

    const cursor = onDropEvent;

    return (
        <div
            onMouseMove={mouseMoveHandler}
            className={blipAsset ? classNames(styles.wrapper, styles.wrapperDrag) : styles.wrapper}
            ref={ref}
        >
            <BlipGenerator onMouseDown={mouseDownHandler} />
            <Radar radar={radar} radius={400} variant={RadarVariant.Editable} blipRadus={blipRadius} />
            {position && blipAsset && (
                <div
                    className={styles.ghost}
                    style={{
                        left: position?.x,
                        top: position?.y,
                    }}
                >
                    <svg width={blipAsset.r * 2} height={blipAsset.r * 2} pointerEvents="none">
                        <RadarBlip
                            id={blipAsset.id}
                            label={blipAsset.label ?? '+'}
                            name={'mock'}
                            r={blipAsset.r}
                            x={blipAsset.r}
                            y={blipAsset.r}
                        />
                    </svg>
                </div>
            )}

            {cursor && position && <Cursor onDropEvent={cursor} x={position?.x} y={position?.y} />}
        </div>
    );
};

export default memo(EditWrapper);
