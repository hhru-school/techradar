import { FC, useState } from 'react';

import Radar from '../../../components/radar/Radar';
import RadarBlip from '../../../components/radar/RadarBlip';
import { sectorNames, ringNames } from '../../../components/radar/testData';
import { RadarComponentVariant } from '../../../components/radar/types';
import { useAppSelector } from '../../../store/hooks';
import Cursor, { CursorType } from './Cursor';

import styles from './wrapper.module.less';

type Position = { x: number; y: number };

const DnDWrapper: FC = () => {
    const data = useAppSelector((state) => state.editRadar.blips);
    const blipGhost = useAppSelector((state) => state.editRadar.editingBlipGeometry);
    const activeSegment = useAppSelector((state) => state.editRadar.activeSegment);
    const editingBlip = useAppSelector((state) => state.editRadar.editingBlip);
    const [position, setPosition] = useState<Position>();

    const mouseMoveHandler = (event: React.MouseEvent) => {
        if (blipGhost) {
            const x = event.clientX - blipGhost.x;
            const y = event.clientY - blipGhost.y;
            setPosition({ x, y });
        }
    };

    let cursor = null;

    if (editingBlip && !activeSegment) {
        cursor = CursorType.Delete;
    }

    if (editingBlip && activeSegment) {
        if (editingBlip.sectorName !== activeSegment.sectorName || editingBlip.ringName !== activeSegment.ringName) {
            cursor = CursorType.Move;
        }
    }

    return (
        <div onMouseMove={mouseMoveHandler} className={blipGhost ? styles.wrapper : ''}>
            <Radar
                sectorNames={sectorNames}
                ringNames={ringNames}
                radius={250}
                data={data}
                variant={RadarComponentVariant.Editable}
            />
            {blipGhost && (
                <div
                    className={styles.draggable}
                    style={{ left: position?.x || blipGhost.x, top: position?.y || blipGhost.y }}
                >
                    <svg width={blipGhost.r * 2} height={blipGhost.r * 2} pointerEvents="none">
                        <RadarBlip id={blipGhost.id} name={'mock'} r={blipGhost.r} x={blipGhost.r} y={blipGhost.r} />
                    </svg>
                </div>
            )}

            {cursor && <Cursor type={cursor} x={position?.x} y={position?.y} />}
        </div>
    );
};

export default DnDWrapper;
