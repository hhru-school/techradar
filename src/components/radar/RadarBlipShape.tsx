import { FC, memo } from 'react';
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
    color: string;
};

const RadarBlipShape: FC<Props> = ({ x, y, r, drawInfo, isActive = false, color }) => {
    const blipFieldClasses = classNames({
        [styles.blipFieldActive]: isActive,
        [styles.blipField]: !isActive,
    });

    const strokeWidth = r / 8;

    const circle = (
        <circle cx={x} cy={y} r={r - strokeWidth} strokeWidth={strokeWidth} fill={color} className={blipFieldClasses} />
    );

    switch (drawInfo) {
        case 'FORWARD': {
            return (
                <path
                    d={buildTriangleUp(x, y, r - strokeWidth)}
                    className={blipFieldClasses}
                    strokeWidth={strokeWidth}
                    fill={color}
                />
            );
        }

        case 'BACKWARD': {
            return (
                <path
                    d={buildTriangleDown(x, y, r - strokeWidth)}
                    className={blipFieldClasses}
                    strokeWidth={strokeWidth}
                    fill={color}
                />
            );
        }

        case 'NEW': {
            return (
                <>
                    <circle
                        cx={x}
                        cy={y}
                        r={r * 1.25}
                        strokeWidth={r / 4.5}
                        stroke={color}
                        className={styles.newBlipFrame}
                    />
                    {circle}
                </>
            );
        }

        case 'SEC_MOVE': {
            const size = 2 * r;
            return (
                <>
                    <rect
                        x={x - size / 2}
                        y={y - size / 2}
                        width={size}
                        height={size}
                        className={blipFieldClasses}
                        strokeWidth={strokeWidth}
                        fill={color}
                    />
                </>
            );
        }

        default: {
            return <>{circle}</>;
        }
    }
};

export default memo(RadarBlipShape);
