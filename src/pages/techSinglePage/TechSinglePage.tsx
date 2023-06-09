import { FC, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import { Alert, Box, Button, CircularProgress, Container, Divider, Grid, SxProps, Typography } from '@mui/material';

import { useGetBlipQuery, useShowTechLogQuery } from '../../api/blipsSinglePageApi';
import { TechSinglePageErrorResponse } from '../../api/types';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setEditTechModalOpen, setTechData } from '../../store/techSinglePageSlice';
import LogList from '../admin/components/logList/LogList';
import EditTechModal from './editTechModal/EditTechModal';

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
    logLoading: { margin: '10px' },
    logListGrid: { display: 'flex', flexDirection: 'column', alignItems: 'center' },
};

const TechSinglePage: FC = () => {
    const { techId } = useParams<{ techId: string }>();
    const {
        data: blipData,
        error: blipErrorMessage,
        isLoading: blipLoading,
        isError: blipError,
    } = useGetBlipQuery(Number(techId));
    const { data: logData = [], isLoading: logLoading } = useShowTechLogQuery(Number(techId));

    const dispatch = useAppDispatch();
    const showEditTechModal = useAppSelector((state) => state.techSinglePage.showEditTechModal);
    const techData = useAppSelector((state) => state.techSinglePage.techData);
    const accessToken = useAppSelector((state) => state.auth.accessToken);

    const onEditTechNameHandler = useCallback(() => dispatch(setEditTechModalOpen(true)), [dispatch]);

    useEffect(() => {
        if (blipData) {
            dispatch(setTechData({ ...blipData }));
        }
    }, [blipData, dispatch]);

    return (
        <Container maxWidth="xl">
            <Box sx={styles.headerBox}>
                <Box sx={styles.nameTech}>{techData.name}</Box>
                {accessToken && (
                    <Button variant="text" sx={styles.headerBtn} onClick={onEditTechNameHandler}>
                        <EditIcon id="editTextAboutTech" color="primary" />
                    </Button>
                )}
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
                    {blipLoading && <CircularProgress color="inherit" sx={styles.logLoading} />}
                    {blipError && (
                        <Alert severity="error">{(blipErrorMessage as TechSinglePageErrorResponse).data.message}</Alert>
                    )}
                </Grid>
                <Grid item xs={12} md={6} sx={styles.logListGrid}>
                    <LogList boxWidth="95%" boxHeight="72vh" blipEvents={logData} isEditable={false} />
                    {logLoading && <CircularProgress color="inherit" sx={styles.logLoading} />}
                </Grid>
            </Grid>
            {showEditTechModal && <EditTechModal />}
        </Container>
    );
};

export default TechSinglePage;
