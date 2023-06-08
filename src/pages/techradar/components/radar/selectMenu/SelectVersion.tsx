import { FC, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';

import { buildRadarViewerUrl } from '../../../../../api/radarApiUtils';
import { VersionApiResponse } from '../../../../../api/types';

type Props = {
    versions: VersionApiResponse[];
    currentVersionId: number;
    companyId: number;
};

const label = 'Версия радара';

const SelectVersion: FC<Props> = ({ versions, currentVersionId, companyId }) => {
    const options = useMemo(
        () =>
            versions.map((version) => (
                <MenuItem key={version.id} value={version.id}>
                    {version.name}
                </MenuItem>
            )),
        [versions]
    );

    const radarId = versions[0].radarId;

    const navigate = useNavigate();

    const handleChange = useCallback(
        (event: SelectChangeEvent<number>) => {
            const versionId = event.target.value as number;
            navigate(buildRadarViewerUrl(companyId, radarId, versionId));
        },
        [navigate, companyId, radarId]
    );

    return (
        <FormControl sx={{ width: 300, my: 2 }}>
            <InputLabel>{label}</InputLabel>
            <Select label={label} variant="standard" onChange={handleChange} value={currentVersionId}>
                {options}
            </Select>
        </FormControl>
    );
};

export default SelectVersion;
