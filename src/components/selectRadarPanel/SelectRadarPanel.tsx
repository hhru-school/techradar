import { FC, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Chip, SxProps } from '@mui/material';

import { buildRadarViewerUrl } from '../../api/radarApiUtils';

import styles from './selectRadarPanel.module.less';

const defaultChip: SxProps = { borderRadius: 1, fontSize: 14 };

const muiStyles: Record<string, SxProps> = {
    chip: defaultChip,
};

type Props = {
    radars: Array<{ id: number; name: string }>;
    companyId: number;
};

const SelectRadarPanel: FC<Props> = ({ radars, companyId }) => {
    const { radarSlug: radarId } = useParams();

    const navigate = useNavigate();

    const chips = useMemo(() => {
        return radars.map((radar) => {
            const isActive = Number(radarId) === radar.id;
            return (
                <Chip
                    key={radar.id}
                    label={radar.name.toUpperCase()}
                    sx={muiStyles.chip}
                    color={isActive ? 'success' : 'default'}
                    onClick={() => {
                        navigate(buildRadarViewerUrl(companyId, radar.id));
                    }}
                />
            );
        });
    }, [radars, radarId, companyId, navigate]);

    return <div className={styles.container}>{chips}</div>;
};

export default SelectRadarPanel;
