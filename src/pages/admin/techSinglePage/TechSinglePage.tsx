import { FC, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, Container, Divider, Grid, TextField, Typography } from '@mui/material';

const boxLogStyle = {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    bgcolor: 'background.paper',
    position: 'relative',
    overflow: 'auto',
    maxHeight: '95%',
    borderRadius: '5px',
    padding: '15px 15px',
    border: '1px solid',
    borderColor: 'rgba(0, 0, 0, 0.23)',
};

const TechSinglePage: FC = () => {
    const [textAboutReadOnly, setTextAboutReadOnly] = useState<boolean>(true);

    return (
        <Container maxWidth="xl">
            <Typography variant="h5" sx={{ textAlign: 'left', margin: '15px 0 15px 40px' }}>
                Название технологии
            </Typography>
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
                    <Grid container>
                        <Grid item xs={6}>
                            <Typography variant="h6">Есть в радарах:</Typography>
                            <Box
                                sx={{
                                    boxSizing: 'border-box',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    width: '98%',
                                    bgcolor: 'background.paper',
                                    position: 'relative',
                                    overflow: 'auto',
                                    maxHeight: '20vh',
                                    borderRadius: '5px',
                                    padding: '15px 15px',
                                    border: '1px solid',
                                    borderColor: 'rgba(0, 0, 0, 0.23)',
                                }}
                            >
                                {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((_, index) => (
                                    <Button key={index} variant="contained" color="primary" sx={{ mb: 1 }}>
                                        Frontend
                                    </Button>
                                ))}
                            </Box>
                        </Grid>
                        <Grid item xs={6} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'end' }}>
                            <Box sx={{ width: '98%' }}>
                                <Typography variant="h6">Отказались от использования:</Typography>
                                <Box
                                    sx={{
                                        boxSizing: 'border-box',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        width: '100%',
                                        bgcolor: 'background.paper',
                                        position: 'relative',
                                        overflow: 'auto',
                                        maxHeight: '20vh',
                                        borderRadius: '5px',
                                        padding: '15px 15px',
                                        border: '1px solid',
                                        borderColor: 'rgba(0, 0, 0, 0.23)',
                                    }}
                                >
                                    {[1, 1].map((_, index) => (
                                        <Button key={index} variant="contained" color="primary" sx={{ mb: 1 }}>
                                            Backend
                                        </Button>
                                    ))}
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid
                    item
                    xs={12}
                    md={6}
                    sx={{
                        maxHeight: '80vh',
                    }}
                >
                    <Typography variant="h5" sx={{ textAlign: 'center', height: '36px' }}>
                        Лог изменений
                    </Typography>
                    <Box sx={boxLogStyle}>
                        {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((_, index) => (
                            <Button key={index} sx={{ borderBottom: '1px solid', marginBottom: '10px' }}>
                                <Typography>
                                    <strong>Дата: 11/04/2023 Время: 20:22 Радар: Frontend</strong>
                                    <br />
                                    Добавил преимущество, изменил ссылку на доку
                                </Typography>
                            </Button>
                        ))}
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default TechSinglePage;
