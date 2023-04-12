import { FC } from 'react';

import RadarSector from './RadarSector';
import { Blip } from './types';

type Props = {
    sectorNames: string[];
    ringNames: string[];
    radius: number;
    gap: number;
    colorScheme: string[];
    data?: Blip[] | null;
};

const RadarField: FC<Props> = ({ ringNames, sectorNames, radius, gap, colorScheme, data }) => {
    const sweepAngle = (2 * Math.PI) / sectorNames.length;
    let currentAngle = 0;
    const sectors = sectorNames.map((sectorName, i) => {
        const sector = (
            <g key={sectorName} transform={`translate (${radius + gap / 2},${radius + gap / 2} )`}>
                <RadarSector
                    startAngle={currentAngle}
                    endAngle={currentAngle + sweepAngle}
                    radius={radius}
                    sectorName={sectorName}
                    ringNames={ringNames}
                    baseColor={colorScheme[i]}
                    data={data?.filter((item) => item.sectorName === sectorName)}
                />
            </g>
        );
        currentAngle += sweepAngle;
        return sector;
    });
    return (
        <svg width={2 * radius + gap} height={2 * radius + gap}>
            {sectors}
        </svg>
    );
};

export default RadarField;
