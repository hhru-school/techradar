import { FC, useCallback, useMemo, useState } from 'react';
import { Chip } from '@mui/material';

import { clearActiveBlip } from '../../../../store/activeBlipSlice';
import {
    clearActiveSector,
    clearHoveredSector,
    setActiveSector,
    setHoveredSector,
} from '../../../../store/activeSectorSlice';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';

import styles from './controls.module.less';

type Props = { sectorName: string; color: string };

const SectorControlChip: FC<Props> = ({ sectorName, color }) => {
    const activeSector = useAppSelector((state) => state.activeSector.activeSectorName);
    const dispatch = useAppDispatch();

    const [hoverColor, setHoverColor] = useState('inherit');

    const onClickHandler = useCallback(() => {
        if (activeSector === sectorName) {
            dispatch(clearActiveSector());
        } else {
            dispatch(setActiveSector(sectorName));
        }
        dispatch(clearActiveBlip());
    }, [activeSector, sectorName, dispatch]);

    const onMouseEnterHandler = useCallback(() => {
        if (!activeSector) dispatch(setHoveredSector(sectorName));
        setHoverColor(color);
    }, [activeSector, sectorName, color, dispatch]);

    const onMouseLeaveHandler = useCallback(() => {
        dispatch(clearHoveredSector());
        setHoverColor('inherit');
    }, [dispatch]);

    const style = useMemo(
        () => ({
            backgroundColor: sectorName === activeSector ? color : 'inherit',

            borderColor: hoverColor,
        }),
        [sectorName, activeSector, hoverColor, color]
    );

    return (
        <Chip
            className={styles.chip}
            onMouseEnter={onMouseEnterHandler}
            onMouseLeave={onMouseLeaveHandler}
            label={sectorName}
            variant="outlined"
            onClick={onClickHandler}
            style={style}
        />
    );
};

export default SectorControlChip;
