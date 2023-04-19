import { FC } from 'react';
import { Typography, Button, Container } from '@mui/material';

import { setTechCreateModalOpen } from '../../../store/dataSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import MyTechCreateModal from './MyTechCreateModal/MyTechCreateModal';
import MyTechDataGrid from './MyTechDataGrid/MyTechDataGrid';

const MyTechnologies: FC = () => {
    const dispatch = useAppDispatch();
    const showTechCreateModal = useAppSelector((state) => state.data.showTechCreateModal);

    return (
        <Container maxWidth="xl">
            <Typography variant="h5" sx={{ textAlign: 'left', margin: '15px 0 0 40px' }}>
                Технологии
            </Typography>

            <Button
                onClick={() => dispatch(setTechCreateModalOpen(true))}
                variant="outlined"
                color="secondary"
                sx={{ textAlign: 'left', margin: '15px 0 15px 40px' }}
            >
                Новая технология +
            </Button>

            <MyTechDataGrid />
            {showTechCreateModal && <MyTechCreateModal />}
        </Container>
    );
};

export default MyTechnologies;
