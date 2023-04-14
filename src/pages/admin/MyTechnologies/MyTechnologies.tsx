import { FC } from 'react';
import { Link } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
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
} from '@mui/material';

import TechItem from '../TechItem/TechItem';

const flexCenter = { display: 'flex', justifyContent: 'center', alignItems: 'center' };

const MyTechnologies: FC = () => {
    return (
        <Container maxWidth="xl">
            <Grid container sx={{ padding: '10px 0', display: 'flex', justifyContent: 'space-around' }}>
                <Grid item md={1} sx={flexCenter}>
                    <Link style={{ ...flexCenter, textAlign: 'center' }} to="/">
                        <ArrowBackIosIcon /> НАЗАД
                    </Link>
                </Grid>
                <Grid item md={3} xs sx={flexCenter}>
                    <Typography variant="h5" sx={{ textAlign: 'center', margin: '15px 15px' }}>
                        Мои технологии
                    </Typography>
                </Grid>
                <Grid item sm={8}>
                    <Grid item xs sm={12} sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                        <Grid item sm={9} sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                            <Grid item sx={{ ...flexCenter, margin: '5px 5px' }}>
                                <FormControl style={{ maxWidth: '100%' }}>
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
                            </Grid>
                            <Grid item sx={{ ...flexCenter, margin: '5px 5px' }}>
                                <FormControl style={{ maxWidth: 200 }}>
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
                            </Grid>
                            <Grid item sx={{ maxWidth: 200, margin: '5px 5px' }}>
                                <Box sx={{ width: '90%' }}>
                                    <input type="text" className="my-radar__input" placeholder="Найти технологию..." />
                                </Box>
                            </Grid>
                        </Grid>
                        <Grid item sm={2} sx={{ display: 'flex', alignItems: 'center' }}>
                            <Link to="/my-tech/tech-constructor">
                                <Button variant="contained" color="success" sx={{ height: '37px' }}>
                                    Создать
                                </Button>
                            </Link>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Divider />
            <Grid container columns={{ xs: 3, sm: 3, md: 12 }} sx={{ margin: '10px 0' }}>
                {[1, 1, 1, 1, 1, 1].map((_, index) => (
                    <Grid item xs={3} md={3} sm={1} style={{ padding: 5 }} key={index}>
                        <TechItem />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default MyTechnologies;
