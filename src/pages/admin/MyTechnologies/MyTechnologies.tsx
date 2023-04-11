import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Divider, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import NativeSelect from '@mui/material/NativeSelect';
import Stack from '@mui/material/Stack';

const MyTechnologies: FC = () => {
    return (
        <Container maxWidth="xl">
            <Grid container spacing={3} sx={{ padding: '10px 0', display: 'flex', justifyContent: 'space-around' }}>
                <Grid item xs={4} md={3} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography variant="h5">Мои технологии</Typography>
                </Grid>
                <Grid item xs>
                    <Stack direction="row" justifyContent={'space-between'} spacing={3}>
                        <Box sx={{ margin: 'auto 0' }}>
                            <input type="text" className="my-radar__input" placeholder="Найти технологию..." />
                        </Box>
                        <FormControl style={{ width: 200 }}>
                            <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                По приватности
                            </InputLabel>
                            <NativeSelect
                                defaultValue={'all'}
                                inputProps={{
                                    name: 'privacy',
                                    id: 'privacy',
                                }}
                            >
                                <option value={'all'}>Все</option>
                                <option value={'public'}>Публичные</option>
                                <option value={'via link'}>Доступные по ссылке</option>
                                <option value={'private'}>Приватные</option>
                            </NativeSelect>
                        </FormControl>
                        <FormControl style={{ width: 200 }}>
                            <InputLabel variant="standard" htmlFor="sortByTime">
                                По времени
                            </InputLabel>
                            <NativeSelect
                                defaultValue={'new'}
                                inputProps={{
                                    name: 'sortByTime',
                                    id: 'sortByTime',
                                }}
                            >
                                <option value={'new'}>Сначала новые</option>
                                <option value={'old'}>Сначала старые</option>
                            </NativeSelect>
                        </FormControl>
                        <Link to="/constructor">
                            <Button variant="contained" color="success" sx={{ height: '100%' }}>
                                Создать
                            </Button>
                        </Link>
                    </Stack>
                </Grid>
            </Grid>
            <Divider />
        </Container>
    );
};

export default MyTechnologies;
