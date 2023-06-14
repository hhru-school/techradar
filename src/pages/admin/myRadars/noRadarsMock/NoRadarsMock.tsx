import { FC, useCallback } from 'react';
import { Box, Typography, Button, SxProps } from '@mui/material';

import { useAppDispatch } from '../../../../store/hooks';
import { setCreateRadarModalOpen } from '../../../../store/myRadarsSlice';

const styles: Record<string, SxProps> = {
    boxText: {
        margin: '20px 0 20px 0',
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

    return (
        <Box sx={styles.boxText}>
            <Typography sx={styles.mockText} variant="h6">
                Кажется, у Вас нет радаров! Это не страшно, попробуйте
            </Typography>

            <Button variant="contained" color="success" sx={styles.newRadarBtn} onClick={handleClick}>
                СОЗДАТЬ!
            </Button>
        </Box>
    );
};

export default NoRadarsMock;
