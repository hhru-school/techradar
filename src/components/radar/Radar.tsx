import { FC } from 'react';

import RadarSector from './RadarSector';
import { Blip } from './types';
import { deg, offset } from './utils';

type Props = {
    sectorNames: string[];
    ringNames: string[];
    radius: number;
    gap: number;
    colorScheme: string[];
    data?: Blip[] | null;
};

const RadarField: FC<Props> = ({ ringNames, sectorNames, radius, gap, colorScheme, data }) => {
    const angle = (2 * Math.PI) / sectorNames.length;

    let currentAngle = 0;
    const ofst = offset(gap, angle / 2);
    const sectors = sectorNames.map((sectorName, i) => {
        const sector = (
            <g
                key={sectorName}
                transform={`translate (${radius + gap / 2 + ofst.x} ${radius + gap / 2 + ofst.y}) rotate(${deg(
                    currentAngle
                )} ${-ofst.x} ${-ofst.y}) `}
            >
                <RadarSector
                    key={sectorName}
                    angle={angle}
                    radius={radius}
                    sectorName={sectorName}
                    ringNames={ringNames}
                    baseColor={colorScheme[i]}
                    data={data?.filter((item) => item.sectorName === sectorName)}
                    seed={i}
                    rotationAngle={currentAngle}
                />
            </g>
        );
        currentAngle += angle;

        return sector;
    });
    return (
        <svg width={2 * radius + gap} height={2 * radius + gap}>
            {sectors}
        </svg>
    );
};

export default RadarField;
