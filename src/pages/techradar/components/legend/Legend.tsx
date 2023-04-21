import { FC, SyntheticEvent } from 'react';
import { Autocomplete, TextField } from '@mui/material';

import { Blip } from '../../../../components/radar/types';
import { setActiveBlip } from '../../../../store/activeBlipSlice';
import { setActiveSector } from '../../../../store/activeSectorSlice';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import LegendSectorGroup from './LegendSectorGroup';

import styles from './legend.module.less';

type Props = { blips: Blip[]; ringNames: string[]; sectorNames: string[]; colorScheme: string[] };

const Legend: FC<Props> = ({ blips, ringNames, sectorNames, colorScheme }) => {
    const hoveredSector = useAppSelector((state) => state.activeSector.hoveredSectorName);
    const activeSector = useAppSelector((state) => state.activeSector.activeSectorName);

    const dispatch = useAppDispatch();

    const sectorGroups = sectorNames.map((sectorName, i) => {
        if (activeSector && activeSector !== sectorName) return null;
        return (
            <LegendSectorGroup
                key={sectorName}
                blips={blips.filter((blip) => blip.sectorName === sectorName)}
                sectorName={sectorName}
                ringNames={ringNames}
                color={colorScheme[i]}
                opacity={hoveredSector && hoveredSector !== sectorName ? 0.2 : 1}
            />
        );
    });

    const onChangeHandler = (event: SyntheticEvent, value: Blip | null) => {
        if (value) {
            dispatch(setActiveSector(value.sectorName));
            dispatch(setActiveBlip(value.id));
        }
    };

    return (
        <div>
            <Autocomplete
                clearOnBlur
                disabled={blips.length === 0}
                disablePortal
                id="search"
                options={blips}
                getOptionLabel={(blip) => blip.name}
                groupBy={(blip) => blip.sectorName}
                onChange={onChangeHandler}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Search" variant="standard" />}
                ListboxProps={{
                    style: {
                        maxHeight: '150px',
                    },
                }}
            />
            <div className={styles.legendContainer}>{sectorGroups}</div>
        </div>
    );
};

export default Legend;
