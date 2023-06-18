import { FC } from 'react';
import classNames from 'classnames';

import { DrawInfo } from './types';
import { buildTriangleDown, buildTriangleUp } from './utils';

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

    switch (drawInfo) {
        case 'FORWARD': {
            return <path d={buildTriangleUp(x, y, r * 0.8)} className={blipFieldClasses} />;
        }

        case 'BACKWARD': {
            return <path d={buildTriangleDown(x, y, r * 0.8)} className={blipFieldClasses} />;
        }

        case 'NEW': {
            return (
                <>
                    <circle cx={x} cy={y} r={r * 1.3} strokeWidth={r / 7} className={styles.newBlipFrame} />
                    <circle cx={x} cy={y} r={r} className={blipFieldClasses} />
                </>
            );
        }

        case 'SEC_MOVE': {
            const size = 2.6 * r;
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
                    <circle cx={x} cy={y} r={r} className={blipFieldClasses} />
                </>
            );
        }

        default: {
            return <circle cx={x} cy={y} r={r} className={blipFieldClasses} />;
        }
    }
};

export default RadarBlipShape;
