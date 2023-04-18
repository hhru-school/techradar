import { FC } from 'react';

import { Blip } from '../../../../components/radar/types';
import LegendRingGroup from './LegendRingGroup';

type Props = { blips: Blip[]; sectorName: string; ringNames: string[] };

const LegendSectorGroup: FC<Props> = ({ blips, sectorName, ringNames }) => {
    const ringGroups = ringNames.map((ringName) => {
        blips = blips.filter((blip) => blip.ringName === ringName);
        return <LegendRingGroup blips={blips} ringName={ringName} />;
    });

    return (
        <div>
            <h3>{sectorName}</h3>
            <div>{ringGroups}</div>
        </div>
    );
};

export default LegendSectorGroup;
