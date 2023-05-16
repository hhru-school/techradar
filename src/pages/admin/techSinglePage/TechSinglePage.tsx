import { FC, useState } from 'react';
import DoneIcon from '@mui/icons-material/Done';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, Container, Divider, Grid, Popover, TextField, Typography } from '@mui/material';

import LogList from '../components/logList/LogList';

const TechSinglePage: FC = () => {
    const [textAboutReadOnly, setTextAboutReadOnly] = useState<boolean>(true);

    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <Container maxWidth="xl">
            <Box sx={{ display: 'flex' }}>
                <Typography variant="h5" sx={{ textAlign: 'left', margin: '15px 0 15px 40px' }}>
                    Название технологии
                </Typography>
                <Button variant="text" sx={{ margin: '0 25px' }} aria-describedby={id} onClick={handleClick}>
                    <EditIcon id="editTextAboutTech" color={!anchorEl ? 'primary' : 'error'} />
                </Button>
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    sx={{ mt: '3px' }}
                >
                    <TextField placeholder="Введите новое название" variant="outlined" />
                    <DoneIcon sx={{ padding: '12px 0', cursor: 'pointer' }} />
                </Popover>
            </Box>
            <Divider />
            <Grid container spacing={2} sx={{ mt: '5px' }}>
                <Grid item xs={12} md={6}>
                    <Box sx={{ display: 'flex', justifyContent: 'start' }}>
                        <Typography variant="h5">О технологии</Typography>
                        <Button
                            variant="text"
                            sx={{ margin: '0 25px' }}
                            onClick={() => {
                                setTextAboutReadOnly(!textAboutReadOnly);
                            }}
                        >
                            <EditIcon color={textAboutReadOnly ? 'primary' : 'error'} />
                            {textAboutReadOnly ? null : (
                                <Typography sx={{ ml: '3px' }}>Нажмите для сохранения</Typography>
                            )}
                        </Button>
                    </Box>

                    <TextField
                        id="outlined-read-only-input"
                        label={textAboutReadOnly ? null : 'Редактирование включено'}
                        defaultValue="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, odit, debitis totam sit
                            tempora amet quia quod sed molestiae omnis temporibus quas, harum accusamus tenetur maiores
                            modi velit dolores? Natus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, odit, debitis totam sit
                            tempora amet quia quod sed molestiae omnis temporibus quas, harum accusamus tenetur maiores
                            modi velit dolores? Natus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, odit, debitis totam sit
                            tempora amet quia quod sed molestiae omnis temporibus quas, harum accusamus tenetur maiores
                            modi velit dolores? Natus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, odit, debitis totam sit
                            tempora amet quia quod sed molestiae omnis temporibus quas, harum accusamus tenetur maiores
                            modi velit dolores? Natus.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, odit, debitis totam sit
                            tempora amet quia quod sed molestiae omnis temporibus quas, harum accusamus tenetur maiores
                            modi velit dolores? Natus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, odit, debitis totam sit
                            tempora amet quia quod sed molestiae omnis temporibus quas, harum accusamus tenetur maiores
                            modi velit dolores? Natus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, odit, debitis totam sit
                            tempora amet quia quod sed molestiae omnis temporibus quas, harum accusamus tenetur maiores
                            modi velit dolores? Natus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, odit, debitis totam sit
                            tempora amet quia quod sed molestiae omnis temporibus quas, harum accusamus tenetur maiores
                            modi velit dolores? Natus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, odit, debitis totam sit
                            tempora amet quia quod sed molestiae omnis temporibus quas, harum accusamus tenetur maiores
                            modi velit dolores? Natus.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, odit, debitis totam sit
                            tempora amet quia quod sed molestiae omnis temporibus quas, harum accusamus tenetur maiores
                            modi velit dolores? Natus."
                        InputProps={{
                            readOnly: textAboutReadOnly,
                        }}
                        multiline
                        placeholder="Внесите информацию о технологии..."
                        maxRows={10}
                        sx={{ width: '100%' }}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <LogList boxWidth="100%" boxMaxHeight="72vh" />
                </Grid>
            </Grid>
        </Container>
    );
};

export default TechSinglePage;
