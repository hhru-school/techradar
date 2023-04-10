import { FC } from 'react';

import Sector from './Sector';
import * as config from './styleConfig';
import { Blip } from './types';

type Props = {
    startAngle: number;
    radius: number;
    sectorNames: string[];
    ringNames: string[];
    gap: number;
    colorScheme: string[];
    data?: Blip[] | null;
};

const Field: FC<Props> = ({
    radius,
    sectorNames,
    ringNames,
    startAngle,
    gap = config.defaultGap,
    colorScheme,
    data = null,
}) => {
    const sweepAngle = (2 * Math.PI) / sectorNames.length;
    let currentStartAngle = startAngle;
    const sectors = sectorNames.map((name, i) => {
        const sector = (
            <Sector
                key={`${name}_${i}`}
                sectorName={name}
                ringNames={ringNames}
                radius={radius}
                sweepAngle={sweepAngle}
                startAngle={currentStartAngle}
                gap={gap}
                baseColor={colorScheme[i]}
                data={data && data.filter((item) => item.sectorName === name)}
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
