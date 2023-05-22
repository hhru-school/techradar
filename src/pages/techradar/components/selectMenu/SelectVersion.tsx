import { FC, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';

import { buildRadarUrl } from '../../../../api/radarApiUtils';
import { Version } from '../../TechRadar';

type Props = {
    versions: Version[];
    version: Version;
    companyId: number;
    radarId: number;
};

const label = 'Версия радара';

const getVersionById = (versions: Version[], id: string) => versions.find((version) => version.id === Number(id));

const SelectVersion: FC<Props> = ({ versions, version, companyId, radarId }) => {
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
            const version = getVersionById(versions, event.target.value) as Version;
            navigate(buildRadarUrl(companyId, radarId, version.name, version.id), { replace: true });
        },
        [navigate, radarId, companyId, versions]
    );

    return (
        <FormControl sx={{ width: 300, my: 3 }}>
            <InputLabel>{label}</InputLabel>
            <Select label={label} onChange={changeHandler} value={String(version.id)}>
                {options}
            </Select>
        </FormControl>
    );
};

export default SelectVersion;
