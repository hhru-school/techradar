import { FC, memo } from 'react';
import classNames from 'classnames';

import { DrawInfo } from './types';
import { buildArrowDown, buildArrowUp } from './utils';

import styles from './blip.module.less';

type Props = {
    x: number;
    y: number;
    r: number;
    drawInfo?: DrawInfo;
    isActive?: boolean;
};

const RadarBlipShape: FC<Props> = ({ x, y, r, drawInfo, isActive = false }) => {
    const blipFieldClasses = classNames({
        [styles.blipFieldActive]: isActive,
        [styles.blipField]: !isActive,
    });

    const strokeWidth = r / 8;

    const circle = <circle cx={x} cy={y} r={r - strokeWidth} strokeWidth={strokeWidth} className={blipFieldClasses} />;

    switch (drawInfo) {
        case 'FORWARD': {
            return (
                <>
                    <path d={buildArrowUp(x, y, r)} className={blipFieldClasses} />
                    {circle}
                </>
            );
        }

        case 'BACKWARD': {
            return (
                <>
                    <path d={buildArrowDown(x, y, r)} className={blipFieldClasses} />;{circle}
                </>
            );
        }

        case 'NEW': {
            return (
                <>
                    <circle cx={x} cy={y} r={r * 1.3} strokeWidth={r / 7} className={styles.newBlipFrame} />
                    {circle}
                </>
            );
        }

        case 'SEC_MOVE': {
            const size = 2.2 * r;
            return (
                <>
                    <rect
                        x={x - size / 2}
                        y={y - size / 2}
                        width={size}
                        height={size}
                        strokeWidth={r / 5}
                        className={styles.newBlipFrame}
                    />
                    {circle}
                </>
            );
        }

        default: {
            return <>{circle}</>;
        }
    }
};

export default memo(RadarBlipShape);
