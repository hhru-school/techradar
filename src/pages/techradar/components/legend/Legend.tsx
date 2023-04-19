import { FC } from 'react';

import { Blip } from '../../../../components/radar/types';
import LegendSectorGroup from './LegendSectorGroup';

type Props = { blips: Blip[]; ringNames: string[]; sectorNames: string[]; colorScheme: string[] };

const Legend: FC<Props> = ({ blips, ringNames, sectorNames, colorScheme }) => {
    const sectorGroups = sectorNames.map((sectorName, i) => {
        return (
            <LegendSectorGroup
                blips={blips.filter((blip) => blip.sectorName === sectorName)}
                sectorName={sectorName}
                ringNames={ringNames}
                color={colorScheme[i]}
            />
        );
    });
    return <div>{sectorGroups}</div>;
};

export default Legend;
