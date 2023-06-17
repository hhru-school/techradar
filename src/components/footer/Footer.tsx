import { FC } from 'react';
import { Box, Typography } from '@mui/material';

import logo from './img/logo.png';

const Footer: FC = () => {
    return (
        <Box
            sx={{
                height: '70px',
                backgroundColor: 'black',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <img src={logo} alt="logo" style={{ height: '30px', marginRight: '5px' }} />
                <Typography color={'secondary'}>Проект школы программистов HeadHunter 2023</Typography>
            </Box>
        </Box>
    );
};

export default Footer;
