import { FC } from 'react';

import RadarSector from './RadarSector';
import {
    defaultBlipRadius,
    defaultColorScheme,
    defaultGap,
    sectorNameFontSize,
    sectorNameTextOffset,
} from './styleConfig';
import { Blip, RadarComponentVariant } from './types';
import { getOffset, getOffsetXY } from './utils';

type Props = {
    sectorNames: string[];
    ringNames: string[];
    radius: number;
    gap?: number;
    colorScheme?: string[];
    data?: Blip[] | null;
    blipRadus?: number;
    variant?: RadarComponentVariant;
};

const Radar: FC<Props> = ({
    ringNames,
    sectorNames,
    radius,
    gap = defaultGap,
    colorScheme = defaultColorScheme,
    data = null,
    blipRadus: blipRadius = defaultBlipRadius,
    variant = RadarComponentVariant.Demonstrative,
}) => {
    const sweepAngle = (2 * Math.PI) / sectorNames.length;
    const ofst = getOffset(gap, sweepAngle);
    const svgRadius = radius + ofst + sectorNameFontSize + sectorNameTextOffset;

    let currentAngle = 0;

    const sectors = sectorNames.map((sectorName, i) => {
        const ofstXY = getOffsetXY(gap, currentAngle, sweepAngle);

        const sector = (
            <g key={sectorName} transform={`translate (${svgRadius + ofstXY.x} ${svgRadius + ofstXY.y})`}>
                <RadarSector
                    startAngle={currentAngle}
                    sweepAngle={sweepAngle}
                    radius={radius}
                    sectorName={sectorName}
                    ringNames={ringNames}
                    baseColor={colorScheme[i]}
                    data={data && data.filter((item) => item.sectorName === sectorName)}
                    seed={i}
                    gap={gap}
                    svgRadius={svgRadius}
                    blipRadius={blipRadius}
                    variant={variant}
                />
            </g>
        );
        currentAngle += sweepAngle;

        return sector;
    });

    return (
        <>
            <svg viewBox={`0 0 ${svgRadius * 2} ${svgRadius * 2}`} width={svgRadius * 2} height={svgRadius * 2}>
                {sectors}
                Sorry, your browser does not support inline SVG.
            </svg>
        </>
    );
};

export default Radar;
