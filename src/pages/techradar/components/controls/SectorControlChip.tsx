import { FC } from 'react';
import { Chip } from '@mui/material';

import { setActiveSector } from '../../../../store/activeSectorSlice';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';

type Props = { sectorName: string; color: string };

const SectorControlChip: FC<Props> = ({ sectorName, color }) => {
    const activeSector = useAppSelector((state) => state.activeSector.activeSectorName);
    const dispatch = useAppDispatch();

    const onClickHandler = () => {
        dispatch(setActiveSector(sectorName));
    };

    return (
        <Chip
            label={sectorName}
            variant="outlined"
            onClick={onClickHandler}
            style={{ backgroundColor: activeSector === sectorName ? color : 'inherit' }}
        />
    );
};

export default SectorControlChip;
