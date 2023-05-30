import { FC, useMemo } from 'react';
import { Box, Typography, TextField, SxProps } from '@mui/material';

import { IndexBlipEventApi } from '../../../../api/types';
import LogListItem from './logListItem/LogListItem';

const styles: Record<string, SxProps> = {
    boxItems: {
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
    },
    boxContainer: { padding: '0 16px' },
    textHeaderStyle: { textAlign: 'center', height: '36px' },
    textField: { width: '100%' },
};

type LogProps = {
    boxWidth?: string;
    boxMaxHeight?: string;
    blipEvents: IndexBlipEventApi[];
    hasHeader?: boolean;
    color?: string;
};

const LogList: FC<LogProps> = ({ boxWidth = '100%', boxMaxHeight = '100%', blipEvents, hasHeader = true }) => {
    const items = useMemo(
        () => blipEvents.map((blipEvent, index) => <LogListItem key={index} blipEvent={blipEvent} />).reverse(),
        [blipEvents]
    );

    const logBoxStyle = useMemo(() => ({ ...styles.boxItems, maxHeight: boxMaxHeight }), [boxMaxHeight]);

    return (
        <Box width={boxWidth} sx={styles.boxContainer} role="presentation">
            {hasHeader && (
                <Typography variant="h5" sx={styles.textHeaderStyle}>
                    Лог событий
                </Typography>
            )}
            <TextField
                sx={styles.textField}
                size={'small'}
                label="Поиск"
                variant="outlined"
                placeholder="Искать по логу..."
            />
            <Box sx={logBoxStyle}>{items}</Box>
        </Box>
    );
};

export default LogList;
