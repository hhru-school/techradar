import { FC, memo, useMemo } from 'react';
import { useDrop } from 'react-dnd';
import classNames from 'classnames';

import { Blip, Ring, Sector } from '../../../components/radar/types';
import { openMoveBlipModal } from '../../../store/editRadarSlice';
import { useAppDispatch } from '../../../store/hooks';
import EditableLegendItem from './EditableLegendItem';

import styles from './legend.module.less';

type Props = {
    sector: Sector;
    ring: Ring;
    blips: Blip[];
    isSearching: boolean;
};

const EditableLegendRingContainer: FC<Props> = ({ sector, ring, blips, isSearching = false }) => {
    const dispatch = useAppDispatch();

    const items = useMemo(
        () => blips.map((blip) => <EditableLegendItem key={blip.id} blip={blip} isSearching={isSearching} />),
        [blips, isSearching]
    );

    const [{ isOver }, dropRef] = useDrop({
        accept: 'blip',
        drop: (blip: Blip) => {
            dispatch(openMoveBlipModal({ id: blip.id, sector, ring }));
        },
        canDrop: (blip: Blip) => blip.sector.id !== sector.id || blip.ring.id !== ring.id,

        collect: (monitor) => ({
            isOver: monitor.isOver() && monitor.canDrop(),
        }),
    });

    const containerClasses = classNames(styles.ringContainer, { [styles.ringContainerIsOver]: isOver });

    return (
        <div className={containerClasses} ref={dropRef}>
            <h4 className={styles.ringName}>{ring.name}</h4>
            {items.length > 0 && <ul className={styles.itemList}>{items}</ul>}
            {items.length === 0 && <div className={styles.emptyContainer}>Пусто</div>}
        </div>
    );
};

export default memo(EditableLegendRingContainer);
