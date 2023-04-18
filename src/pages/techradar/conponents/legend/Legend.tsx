import { FC } from 'react';

import { Blip } from '../../../../components/radar/types';
import LegendSectorGroup from './LegendSectorGroup';

type Props = { blips: Blip[]; ringNames: string[]; sectorNames: string[] };

const Legend: FC<Props> = ({ blips, ringNames, sectorNames }) => {
    const sectorGroups = sectorNames.map((sectorName) => {
        blips = blips.filter((blip) => blip.sectorName === sectorName);
        return <LegendSectorGroup blips={blips} sectorName={sectorName} ringNames={ringNames} />;
    });
    return <div>{sectorGroups}</div>;
};

export default Legend;
