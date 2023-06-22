import { FC } from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Accordion, AccordionDetails, AccordionSummary, Box, SxProps, Typography } from '@mui/material';

import { IndexBlipEventApi } from '../../../../../api/types';

const styles: Record<string, SxProps> = {
    showRadarBtnBox: { cursor: 'pointer', width: '24px', display: 'flex' },
    popoverText: { p: 1 },
    logListItemBox: {
        marginBottom: '5px',
        minWidth: '100px',
        padding: '6px 10px',
        borderRadius: '4px',
        backgroundColor: '#363636',
        color: 'white',
        position: 'relative',
    },
    logListItemHeader: { display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', flexWrap: 'wrap' },
    headerBtnAndText: { display: 'flex' },
    accordion: { minHeight: '30px' },
    accordionSummary: { minHeight: '50px' },
    logText: { display: 'flex', alignItems: 'center', flexWrap: 'wrap' },
    popover: {
        pointerEvents: 'none',
    },
    verAndType: { display: 'flex', flexDirection: 'column' },
};

const getDate = (dateString: string): string => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
};

const getType = (type: string | undefined): string => {
    switch (type) {
        case 'NEW':
            return 'НОВЫЙ';
        case 'BACKWARD':
            return 'ОТ ЦЕНТРА';
        case 'FORWARD':
            return 'К ЦЕНТРУ';
        case 'DELETE':
            return 'УДАЛЕНИЕ';
        case 'SEC_MOVE':
            return 'ПЕРЕМЕЩЕНА В ДРУГОЙ СЕКТОР';
        default:
            return '';
    }
};

type LogListItemProps = {
    blipEvent: IndexBlipEventApi;
    color?: string;
    isEditable: boolean;
};

const LogListItem: FC<LogListItemProps> = ({ blipEvent }) => {
    return (
        <Box sx={styles.logListItemBox}>
            <Box sx={styles.logListItemHeader}>
                <Box sx={styles.headerBtnAndText}>
                    <Typography align={'right'} variant={'h6'}>
                        {getDate(blipEvent.lastChangeTime)}
                    </Typography>
                </Box>
                {blipEvent.blip && (
                    <Typography align={'center'} variant={'h6'}>
                        Автор: {blipEvent.author.username}
                    </Typography>
                )}
                <Box sx={styles.verAndType}>
                    <Typography align={'right'} variant={'h6'}>
                        Версия радара: {blipEvent.radarVersion}
                    </Typography>
                    <Typography align={'right'} variant={'h6'}>
                        Тип: {getType(blipEvent.drawInfo)}
                    </Typography>
                </Box>
            </Box>

            <Accordion sx={styles.accordion}>
                <AccordionSummary
                    expandIcon={<ArrowDropDownIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    sx={styles.accordionSummary}
                >
                    <Typography align="center" variant="body2" sx={styles.logText}>
                        {blipEvent.quadrant && blipEvent.ring
                            ? `${blipEvent.quadrant.name} : ${blipEvent.ring.name}`
                            : 'Создан радар'}
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>{blipEvent.comment ? blipEvent.comment : 'нет комментария'}</Typography>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
};

export default LogListItem;
