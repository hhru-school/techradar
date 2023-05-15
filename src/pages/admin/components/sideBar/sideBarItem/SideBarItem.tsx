import { FC, useState } from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import PreviewIcon from '@mui/icons-material/Preview';
import { Box, Button, Popover, Typography } from '@mui/material';

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
                <Typography sx={{ p: 1 }}>Смотреть радар</Typography>
            </Popover>
        </Box>
    );
};

const SideBarItem: FC = () => {
    const [overflow, setOverflow] = useState<'hidden' | 'visible'>('hidden');

    const onClickItemHandler = () => (overflow === 'hidden' ? setOverflow('visible') : setOverflow('hidden'));

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

            <Typography
                align={'left'}
                paragraph
                variant={'body2'}
                textTransform={'none'}
                overflow={overflow}
                margin={0}
                sx={overflow === 'hidden' ? { height: '50px' } : { minHeight: '50px' }}
            >
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatum neque excepturi quia corrupti
                aliquam delectus reiciendis architecto dolore unde pariatur odio officia hic molestiae alias explicabo,
                recusandae, consequatur saepe? Nulla.Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Voluptatum neque excepturi quia corrupti aliquam delectus reiciendis architecto dolore unde pariatur
                odio officia hic molestiae alias explicabo, recusandae, consequatur saepe? Nulla.Lorem, ipsum dolor sit
                amet consectetur adipisicing elit. Voluptatum neque excepturi quia corrupti aliquam delectus reiciendis
                architecto dolore unde pariatur odio officia hic molestiae alias explicabo, recusandae, consequatur
                saepe? Nulla.
            </Typography>
            <Button sx={{ width: '100%' }} variant="contained" onClick={onClickItemHandler} size={'small'}>
                {overflow === 'hidden' ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
            </Button>
        </Box>
    );
};

export default SideBarItem;
