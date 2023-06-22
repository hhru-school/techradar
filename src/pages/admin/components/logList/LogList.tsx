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
    textLog: { margin: 'auto auto' },
};

type LogProps = {
    boxWidth?: string;
    boxHeight?: string;
    blipEvents: IndexBlipEventApi[];
    hasHeader?: boolean;
    color?: string;
    isEditable?: boolean;
    hasSearch?: boolean;
};

const LogList: FC<LogProps> = ({
    boxWidth = '100%',
    boxHeight = '100%',
    blipEvents,
    hasHeader = true,
    isEditable = true,
    hasSearch = false,
}) => {
    const items = useMemo(
        () =>
            blipEvents
                .map((blipEvent, index) => <LogListItem key={index} blipEvent={blipEvent} isEditable={isEditable} />)
                .reverse(),
        [blipEvents, isEditable]
    );

    const logBoxStyle = useMemo(() => ({ ...styles.boxItems, height: boxHeight }), [boxHeight]);

    return (
        <Box width={boxWidth} sx={styles.boxContainer} role="presentation">
            {hasHeader && (
                <Typography variant="h5" sx={styles.textHeaderStyle}>
                    Лог событий
                </Typography>
            )}
            {hasSearch && (
                <TextField
                    sx={styles.textField}
                    size={'small'}
                    label="Поиск"
                    variant="outlined"
                    placeholder="Искать по логу..."
                />
            )}
            <Box sx={logBoxStyle}>
                {!blipEvents.length ? (
                    <Typography variant="h6" sx={styles.textLog}>
                        Нет событий
                    </Typography>
                ) : (
                    items
                )}
            </Box>
        </Box>
    );
};

export default LogList;
