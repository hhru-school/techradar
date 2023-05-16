import { FC, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, Container, Grid, TextField, Typography } from '@mui/material';

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
            <Typography variant="h5" sx={{ textAlign: 'left', margin: '15px 0 0 40px' }}>
                Название технологии
            </Typography>
            <Grid container spacing={2} sx={{ mt: '5px' }}>
                <Grid
                    item
                    xs={6}
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
                        maxRows={15}
                        sx={{ width: '100%' }}
                    />
                </Grid>
                <Grid
                    item
                    xs={6}
                    sx={{
                        maxHeight: '85vh',
                    }}
                >
                    <Typography variant="h5" sx={{ textAlign: 'center' }}>
                        Лог изменений
                    </Typography>
                    <Box sx={boxLogStyle}>
                        {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((_, index) => (
                            <Button key={index} sx={{ borderBottom: '1px solid', marginBottom: '10px' }}>
                                <Typography>
                                    <strong>
                                        11/04/2023 <br />
                                        20:22
                                    </strong>
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
