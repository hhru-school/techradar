import { FC, useState } from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { Box, Button, Typography } from '@mui/material';

const SideBarItem: FC = () => {
    const [overflow, setOverflow] = useState<'hidden' | 'visible'>('hidden');

    const onClickItemHandler = () => (overflow === 'hidden' ? setOverflow('visible') : setOverflow('hidden'));

    return (
        <Box
            sx={{
                marginBottom: '10px',
                minWidth: '100px',
                padding: '6px 10px',
                borderRadius: '4px',
                backgroundColor: '#363636',
                color: 'white',
            }}
        >
            <Typography align={'center'}>
                <strong>11/04/2023 20:22</strong>

                <Button variant="contained" color={'success'} size={'small'}>
                    Посмотреть радар
                </Button>

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
                    aliquam delectus reiciendis architecto dolore unde pariatur odio officia hic molestiae alias
                    explicabo, recusandae, consequatur saepe? Nulla.
                </Typography>
                <Button sx={{ width: '100%' }} variant="contained" onClick={onClickItemHandler}>
                    {overflow === 'hidden' ? 'Развернуть' : 'Свернуть'}
                    {overflow === 'hidden' ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
                </Button>
            </Typography>
        </Box>
    );
};

export default SideBarItem;
