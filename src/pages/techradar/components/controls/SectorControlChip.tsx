import { FC, useCallback, useMemo, useState } from 'react';
import { Chip } from '@mui/material';

import { Sector } from '../../../../components/radar/types';
import { clearActiveBlip } from '../../../../store/activeBlipSlice';
import {
    clearActiveSector,
    clearHoveredSector,
    setActiveSector,
    setHoveredSector,
} from '../../../../store/activeSectorSlice';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';

import styles from './controls.module.less';

type Props = { sector: Sector; color: string };

const SectorControlChip: FC<Props> = ({ sector, color }) => {
    const activeSectorId = useAppSelector((state) => state.activeSector.activeSectorId);
    const dispatch = useAppDispatch();

    const [hoverColor, setHoverColor] = useState('inherit');

    const onClickHandler = useCallback(() => {
        if (activeSectorId === sector.id) {
            dispatch(clearActiveSector());
        } else {
            dispatch(setActiveSector(sector.id));
        }
        dispatch(clearActiveBlip());
    }, [activeSectorId, sector, dispatch]);

    const onMouseEnterHandler = useCallback(() => {
        if (!activeSectorId) dispatch(setHoveredSector(sector.id));
        setHoverColor(color);
    }, [activeSectorId, sector, color, dispatch]);

    const onMouseLeaveHandler = useCallback(() => {
        dispatch(clearHoveredSector());
        setHoverColor('inherit');
    }, [dispatch]);

    const style = useMemo(
        () => ({
            backgroundColor: sector.id === activeSectorId ? color : 'inherit',

            borderColor: hoverColor,
        }),
        [sector, activeSectorId, hoverColor, color]
    );

    return (
        <Chip
            className={styles.chip}
            onMouseEnter={onMouseEnterHandler}
            onMouseLeave={onMouseLeaveHandler}
            label={sector.name}
            variant="outlined"
            onClick={onClickHandler}
            style={style}
        />
    );
};

export default SectorControlChip;
