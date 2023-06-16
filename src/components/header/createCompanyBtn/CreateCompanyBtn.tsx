import { FC, useCallback } from 'react';
import { Button, SxProps } from '@mui/material';

import { setCreateCompanyModalOpen } from '../../../store/companySlice';
import { useAppDispatch } from '../../../store/hooks';

const styles: Record<string, SxProps> = {
    btn: { width: '203px' },
};

const CreateCompanyBtn: FC = () => {
    const dispatch = useAppDispatch();

    const handleCreateCompany = useCallback(() => {
        dispatch(setCreateCompanyModalOpen(true));
    }, [dispatch]);

    return (
        <Button onClick={handleCreateCompany} variant="contained" color="secondary" sx={styles.btn}>
            добавить компанию
        </Button>
    );
};

export default CreateCompanyBtn;
