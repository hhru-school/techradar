import { SxProps } from '@mui/material/styles';

export const styles: Record<string, SxProps> = {
    iconBtnUnauth: { ml: 2 },
    iconBtn: { margin: 'auto 0' },
    label: { flexGrow: 1, alignItems: 'center' },
    menu: {
        overflow: 'visible',
        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
        mt: 1.5,
        '& .MuiAvatar-root': {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
        },
        '&:before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: 'background.paper',
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0,
        },
    },
    iconBox: {
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
    },
    circleIcon: { color: 'white', fontSize: 49 },
    iconBtnAuth: { ml: 2 },
    toolbar: { display: 'flex', alignItems: 'center', flexWrap: 'wrap', minHeight: '70px' },
    toolbarRight: {
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    icon: { mr: '3px' },
    boxLeft: { flexGrow: 1, display: 'flex' },
    boxLogo: { display: 'flex', mr: '60px', alignItems: 'center' },
    boxLinks: { display: 'flex', flexWrap: 'wrap' },
    generalBtn: { marginRight: '50px' },
};
