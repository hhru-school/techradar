import { FC } from 'react';

import RadarSector from './RadarSector';
import { defaultBlipRadius, sectorNameFontSize, sectorNameTextOffset } from './styleConfig';
import { Blip } from './types';
import { getOffset, getOffsetXY } from './utils';

type Props = {
    sectorNames: string[];
    ringNames: string[];
    radius: number;
    gap: number;
    colorScheme: string[];
    data?: Blip[] | null;
    blipRadus?: number;
};

const Radar: FC<Props> = ({
    ringNames,
    sectorNames,
    radius,
    gap,
    colorScheme,
    data = null,
    blipRadus: blipRadius = defaultBlipRadius,
}) => {
    const sweepAngle = (2 * Math.PI) / sectorNames.length;

    let currentAngle = 0;

    const ofst = getOffset(gap, sweepAngle);
    const svgRadius = radius + ofst + sectorNameFontSize + sectorNameTextOffset;
    const sectors = sectorNames.map((sectorName, i) => {
        const ofstXY = getOffsetXY(gap, currentAngle, sweepAngle);

        const sector = (
            <g key={sectorName} transform={`translate (${svgRadius + ofstXY.x} ${svgRadius + ofstXY.y})`}>
                <RadarSector
                    key={sectorName}
                    startAngle={currentAngle}
                    sweepAngle={sweepAngle}
                    radius={radius}
                    sectorName={sectorName}
                    ringNames={ringNames}
                    baseColor={colorScheme[i]}
                    data={data && data.filter((item) => item.sectorName === sectorName)}
                    seed={i}
                    gap={gap}
                    blipRadius={blipRadius}
                />
            </g>
        );
        currentAngle += sweepAngle;

        return sector;
    });

    return (
        <svg width={svgRadius * 2} height={svgRadius * 2} viewBox={`0 0 ${svgRadius * 2} ${svgRadius * 2}`}>
            {sectors}
            Sorry, your browser does not support inline SVG.
        </svg>
    );
};

export default Radar;
