import { FC, useCallback } from 'react';
import { Typography, Button, Container } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setTechCreateModalOpen } from '../../../store/myTechSlice';
import MyTechCreateModal from './MyTechCreateModal/MyTechCreateModal';
import MyTechDataGrid from './MyTechDataGrid/MyTechDataGrid';

const MyTechnologies: FC = () => {
    const dispatch = useAppDispatch();
    const showTechCreateModal = useAppSelector((state) => state.myTech.showTechCreateModal);

    const handleClick = useCallback(() => dispatch(setTechCreateModalOpen(true)), [dispatch]);

    return (
        <Container maxWidth="xl">
            <Typography variant="h5" sx={{ textAlign: 'left', margin: '15px 0 0 40px' }}>
                Технологии
            </Typography>

            <Button
                onClick={handleClick}
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
