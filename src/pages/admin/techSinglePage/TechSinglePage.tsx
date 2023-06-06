import { FC, useCallback, useEffect } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, Container, Divider, Grid, SxProps, Typography } from '@mui/material';

import { useGetBlipQuery } from '../../../api/blipsSinglePageApi';
import { IndexBlipEventApi } from '../../../api/types';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setEditTechModalOpen, setTechData } from '../../../store/techSinglePageSlice';
import LogList from '../components/logList/LogList';
import EditTechModal from './editTechModal/EditTechModal';

export const mock: IndexBlipEventApi[] = [
    {
        id: 100500,
        comment:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque elementum neque et augue pharetra, id posuere diam fringilla. Mauris pharetra consectetur lobortis.',
        parentId: 1,
        blip: {
            id: 700,
            name: 'Java',
            description: 'Hello world',
            radarId: 1,
        },
        quadrant: {
            id: 1,
            name: 'Tools',
            position: 1,
        },
        ring: {
            id: 1,
            name: 'Active',
            position: 1,
        },
        author: {
            id: 1,
            username: 'John Doe',
        },
        creationTime: '2023-05-30T12:09:41.606821Z',
        lastChangeTime: '2023-05-30T12:09:41.606821Z',
    },
];

const styles: Record<string, SxProps> = {
    nameTech: { margin: '15px 0', fontSize: '30px' },
    headerBox: { display: 'flex' },
    headerBtn: { margin: '0 25px' },
    popover: { mt: '3px' },
    doneIcon: { padding: '12px 0', cursor: 'pointer' },
    grid: { mt: '5px' },
    aboutBox: { display: 'flex', justifyContent: 'start' },
    aboutBtn: { margin: '0 25px' },
    textField: { width: '100%', marginTop: '10px' },
    clickToSave: { ml: '3px' },
};

const TechSinglePage: FC = () => {
    const dispatch = useAppDispatch();
    const showEditTechModal = useAppSelector((state) => state.techSinglePage.showEditTechModal);
    const techData = useAppSelector((state) => state.techSinglePage.techData);

    const { data } = useGetBlipQuery(154);

    const onEditTechNameHandler = useCallback(() => dispatch(setEditTechModalOpen(true)), [dispatch]);

    useEffect(() => {
        if (data) {
            dispatch(setTechData({ ...data }));
        }
    }, [data, dispatch]);

    return (
        <Container maxWidth="xl">
            <Box sx={styles.headerBox}>
                <Box sx={styles.nameTech}>{techData.name}</Box>
                <Button variant="text" sx={styles.headerBtn} onClick={onEditTechNameHandler}>
                    <EditIcon id="editTextAboutTech" color="primary" />
                </Button>
            </Box>
            <Divider />
            <Grid container spacing={2} sx={styles.grid}>
                <Grid item xs={12} md={6}>
                    <Box sx={styles.aboutBox}>
                        <Typography variant="h5">О технологии</Typography>
                    </Box>

                    <Typography sx={styles.textField} variant="subtitle1" gutterBottom>
                        {techData.description}
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <LogList boxWidth="100%" boxMaxHeight="72vh" blipEvents={mock} />
                </Grid>
            </Grid>
            {showEditTechModal && <EditTechModal />}
        </Container>
    );
};

export default TechSinglePage;
