import { FC, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Chip, SxProps, Typography } from '@mui/material';

import { useGetAllCompanyRadarsQuery } from '../../../../api/companyRadarsApi';
import { useAppSelector } from '../../../../store/hooks';

const styles: Record<string, SxProps> = {
    defaultChip: { borderRadius: 1, fontSize: 14 },
    chipsItemsBox: { marginTop: '10px', display: 'flex', flexWrap: 'wrap', gap: '10px' },
    insteadChipsTypo: { margin: '0 auto' },
};

const RadarsChips: FC = () => {
    const navigate = useNavigate();
    const { paramRadarId } = useParams();
    const { companyId } = useParams();
    const currentCompany = useAppSelector((state) => state.company.currentCompany);
    const paramCompanyId = currentCompany ? currentCompany.id : 0;
    const { data: allCompanyRadars } = useGetAllCompanyRadarsQuery(paramCompanyId);

    const tabsItems = useMemo(
        () =>
            allCompanyRadars &&
            companyId &&
            allCompanyRadars.map((radar) => {
                const isActive = Number(paramRadarId) === radar.id;

                return (
                    <Chip
                        color={isActive ? 'success' : 'default'}
                        sx={styles.defaultChip}
                        key={radar.id}
                        label={radar.name.toUpperCase()}
                        onClick={() => {
                            navigate(`company/${companyId}/grid/${radar.id}`);
                        }}
                    />
                );
            }),
        [allCompanyRadars, navigate, paramRadarId, companyId]
    );

    return (
        <Box sx={styles.chipsItemsBox} className="container">
            {allCompanyRadars?.length ? (
                tabsItems
            ) : (
                <Typography variant="h6" sx={styles.insteadChipsTypo}>
                    Здесь можно будет переключаться между радарами
                </Typography>
            )}
        </Box>
    );
};

export default RadarsChips;
