import { FC, useCallback, useState } from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import PreviewIcon from '@mui/icons-material/Preview';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Popover,
    PopoverOrigin,
    SxProps,
    Typography,
} from '@mui/material';

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

const LogListItem: FC = () => {
    return (
        <Box sx={styles.logListItemBox}>
            <Box sx={styles.logListItemHeader}>
                <Box sx={styles.headerBtnAndText}>
                    <ShowRadarBtn />
                    <Typography align={'right'}>11/04/2023 20:22</Typography>
                </Box>
                <Typography align={'center'} variant={'h6'}>
                    Имя технологии
                </Typography>
            </Box>

            <Accordion sx={styles.accordion}>
                <AccordionSummary
                    expandIcon={<ArrowDropDownIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    sx={styles.accordionSummary}
                >
                    <Typography align="center" variant="body2" sx={styles.logText}>
                        эксперимент
                        <ArrowRightAltIcon />
                        <ArrowRightAltIcon />
                        используется
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit
                        amet blandit leo lobortis eget.
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
};

export default LogListItem;
