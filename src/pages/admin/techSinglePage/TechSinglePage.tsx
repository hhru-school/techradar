import { FC, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, Container, Divider, Grid, TextField, Typography } from '@mui/material';

import LogList from '../components/logList/LogList';

const TechSinglePage: FC = () => {
    const [textAboutReadOnly, setTextAboutReadOnly] = useState<boolean>(true);

    return (
        <Container maxWidth="xl">
            <Box sx={{ display: 'flex' }}>
                <Typography variant="h5" sx={{ textAlign: 'left', margin: '15px 0 15px 40px' }}>
                    Название технологии
                </Typography>
                <Button
                    variant="text"
                    sx={{ margin: '0 25px' }}
                    onClick={() => {
                        setTextAboutReadOnly(!textAboutReadOnly);
                    }}
                >
                    <EditIcon id="editTextAboutTech" color={textAboutReadOnly ? 'primary' : 'error'} />
                    {textAboutReadOnly ? null : <Typography>Нажмите для сохранения</Typography>}
                </Button>
            </Box>
            <Divider />
            <Grid container spacing={2} sx={{ mt: '5px' }}>
                <Grid
                    item
                    xs={12}
                    md={6}
                    sx={{
                        maxHeight: '85vh',
                    }}
                >
                    <Box sx={{ display: 'flex', justifyContent: 'start' }}>
                        <Typography variant="h5">О технологии</Typography>
                        <Button
                            variant="text"
                            sx={{ margin: '0 25px' }}
                            onClick={() => {
                                setTextAboutReadOnly(!textAboutReadOnly);
                            }}
                        >
                            <EditIcon id="editTextAboutTech" color={textAboutReadOnly ? 'primary' : 'error'} />
                            {textAboutReadOnly ? null : <Typography>Нажмите для сохранения</Typography>}
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
                <Grid
                    item
                    xs={12}
                    md={6}
                    sx={{
                        maxHeight: '80vh',
                    }}
                >
                    <LogList boxWidth="100%" />
                </Grid>
            </Grid>
        </Container>
    );
};

export default TechSinglePage;
