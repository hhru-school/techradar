import { FC, memo, useMemo } from 'react';
import { useDrop } from 'react-dnd';
import classNames from 'classnames';

import { Blip } from '../../../components/radar/types';
import { openMoveBlipModal } from '../../../store/editRadarSlice';
import { useAppDispatch } from '../../../store/hooks';
import EditableLegendItem from './EditableLegendItem';

import styles from './legend.module.less';

type Props = {
    sectorName: string;
    ringName: string;
    blips: Blip[];
    isSearching: boolean;
};

const EditableLegendRingContainer: FC<Props> = ({ sectorName, ringName, blips, isSearching = false }) => {
    const dispatch = useAppDispatch();

    const items = useMemo(
        () => blips.map((blip) => <EditableLegendItem key={blip.id} blip={blip} isSearching={isSearching} />),
        [blips, isSearching]
    );

    const [{ isOver }, dropRef] = useDrop({
        accept: 'blip',
        drop: (blip: Blip) => {
            dispatch(openMoveBlipModal({ id: blip.id, sectorName, ringName }));
        },
        canDrop: (blip: Blip) => blip.sectorName !== sectorName || blip.ringName !== ringName,

        collect: (monitor) => ({
            isOver: monitor.isOver() && monitor.canDrop(),
        }),
    });

    const containerClasses = classNames(styles.ringContainer, { [styles.ringContainerIsOver]: isOver });

    return (
        <div className={containerClasses} ref={dropRef}>
            <h4 className={styles.ringName}>{ringName}</h4>
            <ul className={styles.itemList}>{items}</ul>
        </div>
    );
};

export default memo(EditableLegendRingContainer);
