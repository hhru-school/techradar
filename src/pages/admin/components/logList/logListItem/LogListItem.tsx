import { FC, useCallback, useState } from 'react';
import { Delete } from '@mui/icons-material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import PreviewIcon from '@mui/icons-material/Preview';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    IconButton,
    Popover,
    PopoverOrigin,
    SxProps,
    Typography,
} from '@mui/material';

import { IndexBlipEventApi } from '../../../../../api/types';
import { openDeleteBlipEventModal } from '../../../../../store/editRadarSlice';
import { useAppDispatch } from '../../../../../store/hooks';

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
};

const anchorOrigin: PopoverOrigin = {
    vertical: 'bottom',
    horizontal: 'left',
};

const transformOrigin: PopoverOrigin = {
    vertical: 'top',
    horizontal: 'left',
};

const getDate = (dateString: string): string => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
};

type LogListItemProps = {
    blipEvent: IndexBlipEventApi;
    color?: string;
    isEditable: boolean;
};

const ShowRadarBtn: FC = () => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const handlePopoverOpen = useCallback((event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    }, []);

    const handlePopoverClose = useCallback(() => {
        setAnchorEl(null);
    }, []);

    const open = Boolean(anchorEl);
    const ariaOwns: string | undefined = open ? 'mouse-over-popover' : undefined;

    return (
        <Box
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}
            aria-owns={ariaOwns}
            sx={styles.showRadarBtnBox}
        >
            <PreviewIcon />
            <Popover
                id="mouse-over-popover"
                sx={styles.popover}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={anchorOrigin}
                transformOrigin={transformOrigin}
                onClose={handlePopoverClose}
                disableRestoreFocus
            >
                <Typography variant={'body2'} sx={styles.popoverText}>
                    Смотреть радар
                </Typography>
            </Popover>
        </Box>
    );
};

const LogListItem: FC<LogListItemProps> = ({ blipEvent, isEditable }) => {
    const dispatch = useAppDispatch();

    const deleteBtnClickHandler = useCallback(() => {
        dispatch(openDeleteBlipEventModal(blipEvent.id));
    }, [dispatch, blipEvent.id]);

    return (
        <Box sx={styles.logListItemBox}>
            <Box sx={styles.logListItemHeader}>
                {isEditable && blipEvent.parentId && (
                    <IconButton color="warning" onClick={deleteBtnClickHandler}>
                        <Delete />
                    </IconButton>
                )}
                <Box sx={styles.headerBtnAndText}>
                    <ShowRadarBtn />
                    <Typography align={'right'}>{getDate(blipEvent.lastChangeTime)}</Typography>
                </Box>
                {blipEvent.blip && (
                    <Typography align={'center'} variant={'h6'}>
                        {blipEvent.blip.name}
                    </Typography>
                )}
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
                    <Typography>{blipEvent.comment}</Typography>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
};

export default LogListItem;
