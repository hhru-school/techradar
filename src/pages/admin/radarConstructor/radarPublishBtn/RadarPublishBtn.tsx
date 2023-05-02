import { FC, useState } from 'react';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { Box, Button, Typography } from '@mui/material';

const RadarPublishBtn: FC = () => {
    const [publish, setPublish] = useState<boolean>(true);

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'end',
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {publish ? (
                    <>
                        <CheckCircleOutlineIcon color="success" />
                        <Typography sx={{ m: 1 }}>Радар опубликован</Typography>
                    </>
                ) : (
                    <>
                        <RadioButtonUncheckedIcon />
                        <Typography sx={{ m: 1 }}>Радар не опубликован</Typography>
                    </>
                )}
            </Box>

            <Button onClick={() => setPublish(!publish)} variant="contained" color={publish ? 'primary' : 'success'}>
                {publish ? 'UNPUBLISH' : 'PUBLISH'}
            </Button>
        </Box>
    );
};

export default RadarPublishBtn;
