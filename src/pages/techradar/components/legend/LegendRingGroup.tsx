import { FC } from 'react';

import { Blip } from '../../../../components/radar/types';
import LegendItem from './LegendItem';

import styles from './legend.module.less';

type Props = { blips: Blip[]; ringName: string };

const LegendRingGroup: FC<Props> = ({ blips, ringName }) => {
    const list = blips.map((blip) => {
        return <LegendItem key={blip.id} id={Number(blip.label)} name={blip.name} description={blip.description} />;
    });

    return (
        <div>
            <h4 className={styles.ringGroupHeader}>{ringName}</h4>
            <ul className={styles.ringGroup}>{list.length > 0 ? list : 'No items'}</ul>
        </div>
    );
};

export default LegendRingGroup;
