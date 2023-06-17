import { FC, useCallback } from 'react';
import { Button } from '@mui/material';

import { setCreateCompanyModalOpen } from '../../../store/companySlice';
import { useAppDispatch } from '../../../store/hooks';

type Props = { width: string };

const CreateCompanyBtn: FC<Props> = ({ width }) => {
    const dispatch = useAppDispatch();

    const handleCreateCompany = useCallback(() => {
        dispatch(setCreateCompanyModalOpen(true));
    }, [dispatch]);

    return (
        <Button onClick={handleCreateCompany} variant="contained" color="secondary" sx={{ width }}>
            добавить компанию
        </Button>
    );
};

export default CreateCompanyBtn;
