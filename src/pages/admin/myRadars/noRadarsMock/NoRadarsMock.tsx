import { FC, useCallback } from 'react';
import { Box, Typography, Button, SxProps } from '@mui/material';

import { useGetCompaniesQuery } from '../../../../api/companiesApi';
import CreateCompanyBtn from '../../../../components/header/createCompanyBtn/CreateCompanyBtn';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
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
    const username = useAppSelector((state) => state.auth.username);
    const { data: companies } = useGetCompaniesQuery(null, { skip: !username });

    const handleClick = useCallback(() => dispatch(setCreateRadarModalOpen(true)), [dispatch]);
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
                    <CreateCompanyBtn width={'203px'} />
                </Box>
            )}
        </Box>
    );
};

export default NoRadarsMock;
