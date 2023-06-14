import { FC, useCallback } from 'react';
import { Button } from '@mui/material';

import { useAppDispatch } from '../../../store/hooks';
import { setCreateRadarModalOpen } from '../../../store/myRadarsSlice';

const CreateRadarBtn: FC = () => {
    const dispatch = useAppDispatch();

    const handleCreateRadar = useCallback(() => {
        dispatch(setCreateRadarModalOpen(true));
    }, [dispatch]);

    return (
        <Button onClick={handleCreateRadar} variant="contained" color="secondary">
            Создать радар
        </Button>
    );
};

export default CreateRadarBtn;
