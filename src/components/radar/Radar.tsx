import { FC, useMemo } from 'react';

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

    const sectors = useMemo(() => {
        let currentAngle = 0;
        return radar.sectors.map((sectorItem, i) => {
            const ofstXY = getOffsetXY(gap, currentAngle, sweepAngle);
            const sectorBlips = radar.blips && radar.blips.filter((blip) => blip.sector.id === sectorItem.id);
            const sector = (
                <g key={sectorItem.id} transform={`translate (${svgRadius + ofstXY.x} ${svgRadius + ofstXY.y})`}>
                    <RadarSector
                        startAngle={currentAngle}
                        sweepAngle={sweepAngle}
                        radius={radius}
                        sector={sectorItem}
                        rings={radar.rings}
                        baseColor={colorScheme[i]}
                        blips={sectorBlips}
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
    }, [radar, sweepAngle, radius, colorScheme, gap, svgRadius, blipRadius, variant]);

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
