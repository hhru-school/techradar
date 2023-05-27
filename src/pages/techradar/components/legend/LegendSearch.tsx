import { FC, SyntheticEvent, useCallback } from 'react';
import { Autocomplete, AutocompleteRenderInputParams, TextField } from '@mui/material';

import { Blip } from '../../../../components/radar/types';
import { clearActiveBlip, setActiveBlip, setOpenDescription } from '../../../../store/activeBlipSlice';
import { setActiveSector } from '../../../../store/activeSectorSlice';
import { useAppDispatch } from '../../../../store/hooks';

type Props = {
    blips: Blip[];
};

const getOptionLabel = (blip: Blip) => blip.name;
const groupBy = (blip: Blip) => blip.sector.name;
const autoCompleteSx = { width: 300 };
const renderInput = (params: AutocompleteRenderInputParams) => (
    <TextField {...params} label="Search" variant="standard" />
);
const listBoxProps = {
    style: {
        maxHeight: 150,
    },
};

const LegendSearch: FC<Props> = ({ blips }) => {
    const dispatch = useAppDispatch();

    const onChangeHandler = useCallback(
        (event: SyntheticEvent, value: Blip | null) => {
            if (value) {
                dispatch(clearActiveBlip());
                dispatch(setActiveSector(value.sector.id));
                dispatch(setActiveBlip(value.id));
                dispatch(setOpenDescription(true));
            }
        },
        [dispatch]
    );

    return (
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
    );
};

export default LegendSearch;
