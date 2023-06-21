import { FC } from 'react';

import RadarBlipShape from '../radar/RadarBlipShape';
import { DrawInfo } from '../radar/types';

type Props = {
    color: string;
    size: number;
    drawInfo: DrawInfo;
};

const SymbolLegendIcon: FC<Props> = ({ color, size, drawInfo }) => {
    return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            <RadarBlipShape x={size / 2} y={size / 2} r={size / 3} color={color} drawInfo={drawInfo} />
        </svg>
    );
};

export default SymbolLegendIcon;
