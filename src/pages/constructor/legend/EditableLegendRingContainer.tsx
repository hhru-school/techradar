import { FC, memo, useMemo } from 'react';

import { Blip } from '../../../components/radar/types';
import EditableLegendItem from './EditableLegendItem';

import styles from './legend.module.less';

type Props = {
    ringName: string;
    blips: Blip[];
};

const EditableLegendRingContainer: FC<Props> = ({ ringName, blips }) => {
    const items = useMemo(
        () => blips.map((blip) => <EditableLegendItem key={blip.id} id={blip.id} name={blip.name} />),
        [blips]
    );

    return (
        <div className={styles.ringContainer}>
            <h4 className={styles.ringName}>{ringName}</h4>
            <ul className={styles.itemList}>{items}</ul>
        </div>
    );
};

export default memo(EditableLegendRingContainer);
