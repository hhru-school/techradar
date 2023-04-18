import { FC } from 'react';

import { Blip } from '../../../../components/radar/types';

import styles from './legend.module.less';

type Props = { blips: Blip[]; ringName: string };

const LegendRingGroup: FC<Props> = ({ blips }) => {
    const sectorName = blips[0].sectorName;
    const ringName = blips[0].ringName;

    const list = blips.map((blip) => {
        if (blip.sectorName !== sectorName) throw new Error('Sector name mismatch');
        if (blip.sectorName !== ringName) throw new Error('Ring name mismatch');
        return (
            <li>
                {blip.id}. {blip.name}
            </li>
        );
    });

    return (
        <div>
            <h4>{ringName}</h4>
            <ul className={styles.list}>{list.length > 0 ? list : 'No items'}</ul>
        </div>
    );
};

export default LegendRingGroup;
