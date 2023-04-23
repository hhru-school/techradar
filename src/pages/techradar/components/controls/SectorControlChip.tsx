import { FC, useState } from 'react';
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

    const onClickHandler = () => {
        if (activeSector === sectorName) dispatch(clearActiveSector());
        else dispatch(setActiveSector(sectorName));
        dispatch(clearActiveBlip());
    };

    const onMouseEnterHandler = () => {
        if (!activeSector) dispatch(setHoveredSector(sectorName));
        setHoverColor(color);
    };

    const onMouseLeaveHandler = () => {
        dispatch(clearHoveredSector());
        setHoverColor('inherit');
    };

    return (
        <Chip
            className={styles.chip}
            onMouseEnter={onMouseEnterHandler}
            onMouseLeave={onMouseLeaveHandler}
            label={sectorName}
            variant="outlined"
            onClick={onClickHandler}
            style={{
                backgroundColor: sectorName === activeSector ? color : 'inherit',

                borderColor: hoverColor,
            }}
        />
    );
};

export default SectorControlChip;
