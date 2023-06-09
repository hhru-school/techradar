import { FC, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { FormControl, InputLabel, ListItemText, MenuItem, Select, SelectChangeEvent } from '@mui/material';

import { buildRadarViewerUrl } from '../../../../../api/radarApiUtils';
import { VersionApiResponse } from '../../../../../api/types';

import styles from './select.module.less';

type Props = {
    versions: VersionApiResponse[];
    currentVersionId: number;
    companyId: number;
};

const label = 'Версия радара';

const style = {
    select: { width: 300, my: 2 },
};

const formatDate = (dateStr: string) => new Date(dateStr).toLocaleString();

const SelectVersion: FC<Props> = ({ versions, currentVersionId, companyId }) => {
    const options = useMemo(
        () =>
            versions.map((version) => (
                <MenuItem key={version.id} value={version.id}>
                    <ListItemText>
                        <div className={styles.menuItem}>
                            <div> {version.name}</div>
                            <div className={styles.date}>{formatDate(version.lastChangeTime)}</div>
                        </div>
                    </ListItemText>
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
        <FormControl sx={style.select}>
            <InputLabel>{label}</InputLabel>
            <Select label={label} variant="standard" onChange={handleChange} value={currentVersionId}>
                {options}
            </Select>
        </FormControl>
    );
};

export default SelectVersion;
