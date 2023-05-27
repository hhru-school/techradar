import { FC } from 'react';

import RadarSector from './RadarSector';
import {
    defaultBlipRadius,
    defaultColorScheme,
    defaultGap,
    sectorNameFontSize,
    sectorNameTextOffset,
} from './styleConfig';
import { RadarVariant } from './types';
import type { RadarInterface } from './types';
import { getOffset, getOffsetXY } from './utils';

type Props = {
    radar: RadarInterface;
    radius: number;
    gap?: number;
    colorScheme?: string[];
    blipRadus?: number;
    variant?: RadarVariant;
};

const Radar: FC<Props> = ({
    radar,
    radius,
    gap = defaultGap,
    colorScheme = defaultColorScheme,
    blipRadus: blipRadius = defaultBlipRadius,
    variant = RadarVariant.Demonstrative,
}) => {
    const sweepAngle = (2 * Math.PI) / radar.sectors.length;
    const ofst = getOffset(gap, sweepAngle);
    const svgRadius = radius + ofst + sectorNameFontSize + sectorNameTextOffset;

    let currentAngle = 0;

    const sectors = radar.sectors.map((sectorItem, i) => {
        const ofstXY = getOffsetXY(gap, currentAngle, sweepAngle);

        const sector = (
            <g key={sectorItem.id} transform={`translate (${svgRadius + ofstXY.x} ${svgRadius + ofstXY.y})`}>
                <RadarSector
                    startAngle={currentAngle}
                    sweepAngle={sweepAngle}
                    radius={radius}
                    sector={sectorItem}
                    rings={radar.rings}
                    baseColor={colorScheme[i]}
                    blips={radar.blips && radar.blips.filter((item) => item.sector.name === sectorItem.name)}
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
