import { FC, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import Radar from '../../../components/radar/Radar';
import RadarBlip from '../../../components/radar/RadarBlip';
import { defaultBlipRadius } from '../../../components/radar/styleConfig';
import { sectorNames, ringNames } from '../../../components/radar/testData';
import { RadarComponentVariant } from '../../../components/radar/types';
import { setDraggingBlip, setIsCreating } from '../../../store/editRadarSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { mouseUpHandler } from '../utils';
import BlipGenerator from './BlipGenerator';
import Cursor from './Cursor';

import styles from './wrapper.module.less';

type Position = { x: number; y: number };

const DnDWrapper: FC = () => {
    const data = useAppSelector((state) => state.editRadar.blips);
    const blipAsset = useAppSelector((state) => state.editRadar.blipAsset);
    const onDropEvent = useAppSelector((state) => state.editRadar.onDropEvent);

    const dispatch = useAppDispatch();

    const ref = useRef<HTMLDivElement>(null);

    const [bbox, setBbox] = useState<{ left: number; top: number }>();

    const [position, setPosition] = useState<Position | null>(null);

    const mouseMoveHandler = (event: React.MouseEvent) => {
        if (blipAsset && bbox) {
            const x = event.clientX - blipAsset.offsetX - bbox.left;
            const y = event.clientY - blipAsset.offsetY - bbox.top;
            setPosition({ x, y });
        }
    };

    const mouseDownHandler = (event: React.MouseEvent) => {
        if (bbox) {
            const r = defaultBlipRadius;
            const x = event.clientX - bbox.left;
            const y = event.clientY - bbox.top;
            dispatch(setDraggingBlip({ id: 100, r, x, y, offsetX: r / 2, offsetY: r / 2 }));
            dispatch(setIsCreating());
            document.addEventListener('mouseup', mouseUpHandler);
            setPosition({ x, y });
        }
    };

    useEffect(() => {
        setBbox(ref.current?.getBoundingClientRect());
        if (!blipAsset) {
            setPosition(null);
        }
    }, [blipAsset]);

    const cursor = onDropEvent;

    return (
        <div
            onMouseMove={mouseMoveHandler}
            className={blipAsset ? classNames(styles.wrapper, styles.wrapperDrag) : styles.wrapper}
            ref={ref}
        >
            <BlipGenerator onMouseDown={mouseDownHandler} />
            <Radar
                sectorNames={sectorNames}
                ringNames={ringNames}
                radius={250}
                data={data}
                variant={RadarComponentVariant.Editable}
            />
            {position && blipAsset && (
                <div
                    className={styles.ghost}
                    style={{
                        left: position?.x,
                        top: position?.y,
                    }}
                >
                    <svg width={blipAsset.r * 2} height={blipAsset.r * 2} pointerEvents="none">
                        <RadarBlip id={blipAsset.id} name={'mock'} r={blipAsset.r} x={blipAsset.r} y={blipAsset.r} />
                    </svg>
                </div>
            )}

            {cursor && <Cursor onDropEvent={cursor} x={position?.x} y={position?.y} />}
        </div>
    );
};

export default DnDWrapper;
