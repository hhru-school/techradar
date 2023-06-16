import { FC, useCallback } from 'react';
import { Box, Typography, Button, SxProps } from '@mui/material';

import { useGetCompaniesQuery } from '../../../../api/companiesApi';
import CreateCompanyBtn from '../../../../components/header/createCompanyBtn/CreateCompanyBtn';
import { useAppDispatch } from '../../../../store/hooks';
import { setCreateRadarModalOpen } from '../../../../store/myRadarsSlice';

const styles: Record<string, SxProps> = {
    boxText: {
        margin: '0 0 20px 0',
        paddingTop: '150px',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
    },
    newRadarBtn: { height: '36px' },
    mockText: { marginRight: '5px' },
};

const NoRadarsMock: FC = () => {
    const dispatch = useAppDispatch();
    const handleClick = useCallback(() => dispatch(setCreateRadarModalOpen(true)), [dispatch]);
    const { data: companies } = useGetCompaniesQuery();

    return (
        <Box sx={styles.boxText}>
            {companies && companies.length ? (
                <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                    <Typography sx={styles.mockText} variant="h6">
                        Кажется, у Вас нет радаров! Это не страшно, попробуйте
                    </Typography>
                    <Button variant="contained" color="secondary" sx={styles.newRadarBtn} onClick={handleClick}>
                        СОЗДАТЬ!
                    </Button>
                </Box>
            ) : (
                <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                    <Typography sx={styles.mockText} variant="h6">
                        Кажется, Вы не добавили компанию, без этого вы не сможете создать радар! Это не сложно,
                        попробуйте
                    </Typography>
                    <CreateCompanyBtn />
                </Box>
            )}
        </Box>
    );
};

export default NoRadarsMock;
