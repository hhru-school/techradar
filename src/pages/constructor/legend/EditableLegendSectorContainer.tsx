import { FC, memo, useMemo } from 'react';

import { Blip } from '../../../components/radar/types';
import EditableLegendRingContainer from './EditableLegendRingContainer';

import styles from './legend.module.less';

type Props = {
    sectorName: string;
    ringNames: string[];
    blips: Blip[];
    color?: string;
    isSearching?: boolean;
};

const EditableLegendSectorContainer: FC<Props> = ({ sectorName, ringNames, blips, color, isSearching = false }) => {
    const ringContainers = useMemo(
        () =>
            ringNames.map((ringName) => {
                const ringBlips = blips.filter((blip) => blip.ringName === ringName);
                if (isSearching && ringBlips.length === 0) return null;
                return (
                    <EditableLegendRingContainer
                        key={ringName}
                        sectorName={sectorName}
                        ringName={ringName}
                        blips={ringBlips}
                        isSearching={isSearching}
                    />
                );
            }),
        [ringNames, sectorName, blips, isSearching]
    );

    return (
        <div className={styles.sectorContainer}>
            <h3 style={{ color }} className={styles.sectorName}>
                {sectorName}
            </h3>
            <div className={styles.sectorContainerList}> {ringContainers}</div>
        </div>
    );
};

export default memo(EditableLegendSectorContainer);
