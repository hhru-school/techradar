import { FC, memo, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import { BasicRadarData } from '../../../api/radarApiUtils';
import Radar from '../../../components/radar/Radar';
import RadarBlip from '../../../components/radar/RadarBlip';
import { defaultBlipRadius } from '../../../components/radar/styleConfig';
import { RadarComponentVariant } from '../../../components/radar/types';
import { setDraggingBlip, setIsCreating } from '../../../store/editRadarSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { mouseUpHandler } from '../utils';
import BlipGenerator from './BlipGenerator';
import Cursor from './Cursor';

import styles from './wrapper.module.less';

type Position = { x: number; y: number };

type Props = {
    radar: BasicRadarData;
};

const EditWrapper: FC<Props> = ({ radar }) => {
    const sectorNames = radar.sectorNames;
    const ringNames = radar.ringNames;
    const data = radar.blips;

    const blipAsset = useAppSelector((state) => state.editRadar.blipAsset);
    const onDropEvent = useAppSelector((state) => state.editRadar.eventSuggest);
    const showEditIcon = useAppSelector((state) => state.editRadar.showEditIcon);

    const dispatch = useAppDispatch();

    const ref = useRef<HTMLDivElement>(null);

    const [bbox, setBbox] = useState<{ left: number; top: number }>();

    const [position, setPosition] = useState<Position | null>(null);

    const mouseMoveHandler = (event: React.MouseEvent) => {
        if (bbox) {
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
                        <RadarBlip
                            id={blipAsset.id}
                            label={blipAsset.label}
                            name={'mock'}
                            r={blipAsset.r}
                            x={blipAsset.r}
                            y={blipAsset.r}
                        />
                    </svg>
                </div>
            )}

            {cursor && <Cursor onDropEvent={cursor} x={position?.x} y={position?.y} />}
        </div>
    );
};

export default memo(EditWrapper);
