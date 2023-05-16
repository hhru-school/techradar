import { FC } from 'react';
import { Box, Typography, TextField } from '@mui/material';

import LogListItem from './logListItem/LogListItem';

const boxStyle = {
    mt: '8px',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    bgcolor: 'background.paper',
    position: 'relative',
    overflow: 'auto',
    borderRadius: '5px',
    padding: '15px 15px',
    border: '1px solid',
    borderColor: 'rgba(0, 0, 0, 0.23)',
};

type LogProps = { boxWidth: string; boxMaxHeight: string };

const LogList: FC<LogProps> = ({ boxWidth, boxMaxHeight }) => {
    return (
        <Box width={boxWidth} sx={{ padding: '0 16px' }} role="presentation">
            <Typography variant="h5" sx={{ textAlign: 'center', height: '36px' }}>
                Лог событий
            </Typography>
            <TextField
                sx={{ width: '100%' }}
                size={'small'}
                label="Поиск"
                variant="outlined"
                placeholder="Искать по логу..."
            />
            <Box sx={{ ...boxStyle, maxHeight: boxMaxHeight }}>
                {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((_, index) => (
                    <LogListItem key={index} />
                ))}
            </Box>
        </Box>
    );
};

export default LogList;
