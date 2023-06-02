import { FC, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Chip, SxProps } from '@mui/material';

import { buildRadarViewerUrl } from '../../../../api/radarApiUtils';

import styles from './selectRadarPanel.module.less';

const chipStyle: SxProps = {
    borderRadius: 1,
    fontSize: 14,
};

type Props = {
    radars: Array<{ id: number; name: string }>;
    companyId: number;
};

const SelectRadarPanel: FC<Props> = ({ radars, companyId }) => {
    const { radarId } = useParams();

    const navigate = useNavigate();

    const chips = useMemo(() => {
        return radars.map((radar) => {
            const sx = Number(radarId) === radar.id ? chipStyle : { ...chipStyle, backgroundColor: '#eff294' };
            return (
                <Chip
                    label={radar.name.toUpperCase()}
                    sx={sx}
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
