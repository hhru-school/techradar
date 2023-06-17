import { FC } from 'react';
import { Box, SxProps, Typography } from '@mui/material';

import logo from './img/logo.png';

import './Footer.less';

const styles: Record<string, SxProps> = {
    box: {
        position: 'absolute',
        bottom: '0',
        height: '70px',
        backgroundColor: '#363636',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
};

const Footer: FC = () => {
    return (
        <Box sx={styles.box}>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <img src={logo} alt="logo" className="img" />
                <Typography color={'secondary'}>Проект школы программистов HeadHunter 2023</Typography>
            </Box>
        </Box>
    );
};

export default Footer;
