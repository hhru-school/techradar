import { FC } from 'react';

import Sector from './Sector';

type Props = {
    startAngle: number;
    radius: number;
    sectorNames: string[];
    ringNames: string[];
    gap?: number;
};

const Field: FC<Props> = ({ radius, sectorNames, ringNames, startAngle, gap = 0 }) => {
    const sweepAngle = (2 * Math.PI) / sectorNames.length;
    let currentStartAngle = startAngle;
    const sectors = sectorNames.map((item, i) => {
        const sector = (
            <Sector
                key={`${item}_${i}`}
                sectorName={item}
                ringNames={ringNames}
                radius={radius}
                sweepAngle={sweepAngle}
                startAngle={currentStartAngle}
                gap={gap}
            />
        );
        currentStartAngle += sweepAngle;
        return sector;
    });
    return (
        <svg width={2 * radius + gap} height={2 * radius + gap}>
            <g>{sectors}</g>
        </svg>
    );
};

export default Field;
