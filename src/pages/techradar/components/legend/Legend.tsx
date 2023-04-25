import { FC, SyntheticEvent, useCallback, useMemo } from 'react';
import { Autocomplete, AutocompleteRenderInputParams, TextField } from '@mui/material';

import { Blip } from '../../../../components/radar/types';
import { clearActiveBlip, setActiveBlip, setOpenDescription } from '../../../../store/activeBlipSlice';
import { setActiveSector } from '../../../../store/activeSectorSlice';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import LegendSectorGroup from './LegendSectorGroup';

import styles from './legend.module.less';

type Props = { blips: Blip[]; ringNames: string[]; sectorNames: string[]; colorScheme: string[] };

const suggestsHight = 150;

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
            dispatch(clearActiveBlip());
            dispatch(setActiveSector(value.sectorName));
            dispatch(setActiveBlip(value.id));
            dispatch(setOpenDescription(true));
        }
    };

    const getOptionLabel = useCallback((blip: Blip) => blip.name, []);
    const groupBy = useCallback((blip: Blip) => blip.sectorName, []);
    const autoCompleteSx = { width: 300 };
    const renderInput = useCallback(
        (params: AutocompleteRenderInputParams) => <TextField {...params} label="Search" variant="standard" />,
        []
    );
    const listBoxProps = useMemo(
        () => ({
            style: {
                maxHeight: suggestsHight,
            },
        }),
        []
    );

    const isActiveSector = Boolean(activeSector);

    const legendContainerStyle = useMemo(
        () => ({ marginTop: isActiveSector ? suggestsHight + 30 : 0 }),
        [isActiveSector]
    );

    return (
        <div>
            <Autocomplete
                clearOnBlur
                disabled={blips.length === 0}
                disablePortal
                id="search"
                options={blips}
                getOptionLabel={getOptionLabel}
                groupBy={groupBy}
                onChange={onChangeHandler}
                sx={autoCompleteSx}
                renderInput={renderInput}
                ListboxProps={listBoxProps}
            />
            <div className={styles.legendContainer} style={legendContainerStyle}>
                {sectorGroups}
            </div>
        </div>
    );
};

export default Legend;
