import { FC } from 'react';

import { Blip, RadarComponentVariant } from '../../../../components/radar/types';
import LegendItem from './LegendItem';

import styles from './legend.module.less';

type Props = { blips: Blip[]; ringName: string; variant?: RadarComponentVariant };

const LegendRingGroup: FC<Props> = ({ blips, ringName, variant = RadarComponentVariant.Demonstrative }) => {
    const list = blips.map((blip) => {
        return (
            <LegendItem key={blip.id} id={blip.id} name={blip.name} description={blip.description} variant={variant} />
        );
    });

    return (
        <div>
            <h4 className={styles.ringGroupHeader}>{ringName}</h4>
            <ul className={styles.ringGroup}>{list.length > 0 ? list : 'No items'}</ul>
        </div>
    );
};

export default LegendRingGroup;
