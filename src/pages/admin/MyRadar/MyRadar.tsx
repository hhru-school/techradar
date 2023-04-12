import { FC } from 'react';
import { Link } from 'react-router-dom';
import {
    Divider,
    Typography,
    Box,
    Button,
    Container,
    FormControl,
    Grid,
    InputLabel,
    NativeSelect,
    Stack,
} from '@mui/material';

import RadarItem from '../RadarItem/RadarItem';

import './MyRadar.less';

const MyRadar: FC = () => {
    return (
        <Container maxWidth="xl">
            <Grid container spacing={3} sx={{ padding: '10px 0', display: 'flex', justifyContent: 'space-around' }}>
                <Grid item xs={4} md={3} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography variant="h5">Мои радары</Typography>
                </Grid>
                <Grid item xs>
                    <Stack direction="row" justifyContent={'space-between'} spacing={3}>
                        <Box sx={{ margin: 'auto 0' }}>
                            <input type="text" className="my-radar__input" placeholder="Найти радар..." />
                        </Box>
                        <FormControl style={{ width: 200 }}>
                            <InputLabel variant="standard" htmlFor="sortByTime">
                                По названию
                            </InputLabel>
                            <NativeSelect
                                defaultValue={'bca'}
                                inputProps={{
                                    name: 'sortByName',
                                    id: 'sortByName',
                                }}
                            >
                                <option value={'abc'}>По алфавиту</option>
                                <option value={'cba'}>В обратном порядке</option>
                                <option value={'bca'}>Вразброс</option>
                            </NativeSelect>
                        </FormControl>
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
                        <Link to="/my-radars/radar-constructor">
                            <Button variant="contained" color="success" sx={{ height: '100%' }}>
                                Создать
                            </Button>
                        </Link>
                    </Stack>
                </Grid>
            </Grid>
            <Divider />
            <Grid container columns={{ xs: 3, sm: 3, md: 12 }} style={{ margin: '10px 0' }}>
                {[1, 1, 1, 1, 1, 1].map((_, index) => (
                    <Grid item xs={3} style={{ padding: 5 }} key={index}>
                        <RadarItem />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default MyRadar;
