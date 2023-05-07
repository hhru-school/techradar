import { FC, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import Radar from '../../../components/radar/Radar';
import RadarBlip from '../../../components/radar/RadarBlip';
import { sectorNames, ringNames } from '../../../components/radar/testData';
import { RadarComponentVariant } from '../../../components/radar/types';
import { useAppSelector } from '../../../store/hooks';
import BlipGenerator from './BlipGenerator';
import Cursor from './Cursor';

import styles from './wrapper.module.less';

type Position = { x: number; y: number };

const DnDWrapper: FC = () => {
    const data = useAppSelector((state) => state.editRadar.blips);
    const blipAsset = useAppSelector((state) => state.editRadar.blipAsset);
    const onDropEvent = useAppSelector((state) => state.editRadar.onDropEvent);

    const ref = useRef<HTMLDivElement>(null);
    const bbox = ref.current?.getBoundingClientRect();

    const [position, setPosition] = useState<Position | null>(null);

    const mouseMoveHandler = (event: React.MouseEvent) => {
        if (blipAsset && bbox) {
            const x = event.clientX - blipAsset.offsetX - bbox.left;
            const y = event.clientY - blipAsset.offsetY - bbox.top;
            setPosition({ x, y });
        }
    };

    useEffect(() => {
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
            <BlipGenerator />
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
