import { FC, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';

import { buildRadarViewerUrl } from '../../../../../api/radarApiUtils';
import { VersionApiResponse } from '../../../../../api/types';

type Props = {
    versions: VersionApiResponse[];
    version: VersionApiResponse;
    companyId: number;
};

const label = 'Версия радара';

const getVersionById = (versions: VersionApiResponse[], id: number) => versions.find((version) => version.id === id);

const SelectVersion: FC<Props> = ({ versions, version, companyId }) => {
    const options = useMemo(
        () =>
            versions.map((version) => (
                <MenuItem key={version.id} value={version.id}>
                    {version.name}
                </MenuItem>
            )),
        [versions]
    );

    const navigate = useNavigate();

    const changeHandler = useCallback(
        (event: SelectChangeEvent) => {
            const version = getVersionById(versions, Number(event.target.value)) as VersionApiResponse;
            navigate(buildRadarViewerUrl(companyId, version.radarId, version.id), { replace: true });
        },
        [navigate, companyId, versions]
    );

    return (
        <FormControl sx={{ width: 300, my: 2 }}>
            <InputLabel>{label}</InputLabel>
            <Select label={label} onChange={changeHandler} value={String(version.id)} variant="standard">
                {options}
            </Select>
        </FormControl>
    );
};

export default SelectVersion;
