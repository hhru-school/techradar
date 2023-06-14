import { FC, useState, useCallback } from 'react';
import InfoIcon from '@mui/icons-material/Info';
import { Button, Popover, Typography } from '@mui/material';

const InfoBtn: FC = () => {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    }, []);

    const handleClose = useCallback(() => {
        setAnchorEl(null);
    }, []);

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <>
            <Button
                aria-describedby={id}
                onClick={handleClick}
                sx={{
                    borderRadius: '100%',
                    height: '17px',
                    minWidth: '0px',
                    padding: '0',
                    width: '17px',
                    ml: '4px',
                }}
            >
                <InfoIcon fontSize="small" />
            </Button>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <Typography sx={{ p: 2 }}>
                    Если чекбокс неактивен, скрыты все черновики, не связанные с последней публичной версией
                </Typography>
            </Popover>
        </>
    );
};

export default InfoBtn;
