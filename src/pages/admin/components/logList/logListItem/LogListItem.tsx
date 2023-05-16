import { FC, useState } from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import PreviewIcon from '@mui/icons-material/Preview';
import { Accordion, AccordionDetails, AccordionSummary, Box, Popover, Typography } from '@mui/material';

const ShowRadarBtn: FC = () => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    return (
        <Box
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}
            aria-owns={open ? 'mouse-over-popover' : undefined}
            sx={{ cursor: 'pointer', width: '24px', display: 'flex' }}
        >
            <PreviewIcon />
            <Popover
                id="mouse-over-popover"
                sx={{
                    pointerEvents: 'none',
                }}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
            >
                <Typography variant={'body2'} sx={{ p: 1 }}>
                    Смотреть радар
                </Typography>
            </Popover>
        </Box>
    );
};

const LogListItem: FC = () => {
    return (
        <Box
            sx={{
                marginBottom: '5px',
                minWidth: '100px',
                padding: '6px 10px',
                borderRadius: '4px',
                backgroundColor: '#363636',
                color: 'white',
                position: 'relative',
            }}
        >
            <Box sx={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', flexWrap: 'wrap' }}>
                <Box sx={{ display: 'flex' }}>
                    <ShowRadarBtn />
                    <Typography align={'right'}>11/04/2023 20:22</Typography>
                </Box>
                <Typography align={'center'} variant={'h6'}>
                    Имя технологии
                </Typography>
            </Box>

            <Accordion sx={{ minHeight: '30px' }}>
                <AccordionSummary
                    expandIcon={<ArrowDropDownIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    sx={{ minHeight: '50px' }}
                >
                    <Typography
                        align="center"
                        variant="body2"
                        sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}
                    >
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
