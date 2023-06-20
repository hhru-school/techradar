import { FC, memo, useEffect, useRef, useState } from 'react';
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

const EditWrapper: FC<Props> = ({ radar }) => {
    const blipAsset = useAppSelector((state) => state.editRadar.blipAsset);
    const onDropEvent = useAppSelector((state) => state.editRadar.eventSuggest);
    const showEditIcon = useAppSelector((state) => state.editRadar.showEditIcon);

    const dispatch = useAppDispatch();

    const ref = useRef<HTMLDivElement>(null);

    const [bbox, setBbox] = useState<{ left: number; top: number }>();

    const [position, setPosition] = useState<Position | null>(null);

    const mouseMoveHandler = (event: React.MouseEvent) => {
        if (bbox) {
            // автоскролл если потянутый элемент внизу экрана и ещё есть место куда пролистывать
            // if (event.clientY >= window.innerHeight - 10 && event.pageY < document.body.offsetHeight - 10) {
            //     setScroll(150);
            // }

            // а это если элемент вверху
            // if (event.clientY <= 10 && event.clientY !== event.pageY) {
            //     setScroll(-150);
            // }

            // console.log(scroll);

            let x = event.clientX - bbox.left;
            let y = event.clientY - bbox.top;
            if (blipAsset) {
                x -= blipAsset.offsetX;
                y -= blipAsset.offsetY;
            }
            setPosition({ x, y });
        }
    };

    const mouseDownHandler = (event: React.MouseEvent) => {
        if (bbox) {
            const r = defaultBlipRadius;
            const x = event.clientX - bbox.left;
            const y = event.clientY - bbox.top;
            dispatch(setDraggingBlip({ id: -1, label: '+', r, x, y, offsetX: r / 2, offsetY: r / 2 }));
            dispatch(setIsCreating());
            document.addEventListener('mouseup', mouseUpHandler);
            setPosition({ x, y });
        }
    };

    useEffect(() => {
        setBbox(ref.current?.getBoundingClientRect());
        if (!blipAsset || !showEditIcon) {
            setPosition(null);
        }
    }, [blipAsset, showEditIcon]);

    // useEffect(() => {
    //     if (blipAsset) {
    //         window.scrollBy({
    //             top: scroll,
    //             behavior: 'smooth',
    //         });
    //     }
    // }, [scroll, blipAsset]);

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
