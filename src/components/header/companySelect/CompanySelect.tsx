import { FC, useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { SelectChangeEvent, FormControl, Select, MenuItem, SxProps } from '@mui/material';

import { useGetCompaniesQuery } from '../../../api/companiesApi';
import { setCurrentCompany } from '../../../store/companySlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import CreateCompanyBtn from '../createCompanyBtn/CreateCompanyBtn';

const styles: Record<string, SxProps> = {
    formControl: { m: 1, minWidth: 120 },
    select: {
        m: 1,
        minWidth: 120,
        backgroundColor: 'white',
        height: '38px',
        display: 'flex',
    },
};

const CompanySelect: FC = () => {
    const dispatch = useAppDispatch();
    const { companyId } = useParams();
    const navigate = useNavigate();
    const { data: companies } = useGetCompaniesQuery();
    const currentCompany = useAppSelector((state) => state.company.currentCompany);

    const [age, setAge] = useState('0');

    const handleChange = useCallback(
        (event: SelectChangeEvent) => {
            setAge(event.target.value);
            if (companies) {
                for (let i = 0; i < companies.length; i++) {
                    if (companies[i].id === +event.target.value) {
                        dispatch(setCurrentCompany(companies[i]));
                        navigate(`company/${companies[i].id}`);
                    }
                }
            }
        },
        [companies, dispatch, navigate]
    );

    useEffect(() => {
        if (currentCompany) {
            setAge(`${currentCompany.id}`);
            dispatch(setCurrentCompany(currentCompany));
        } else if (companies?.length) {
            setAge(`${companies[0].id}`);
            dispatch(setCurrentCompany(companies[0]));
        }
    }, [companies, companyId, currentCompany, dispatch, navigate]);

    const renderItems = companies ? (
        companies.map((company) => {
            return (
                <MenuItem key={company.id} value={company.id}>
                    {`компания ${company.name}`}
                </MenuItem>
            );
        })
    ) : (
        <MenuItem value={'0'}>Нет компаний</MenuItem>
    );

    return (
        <>
            {companies && companies.length ? (
                <FormControl sx={styles.formControl}>
                    <Select
                        name={'company'}
                        value={age}
                        onChange={handleChange}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                        sx={styles.select}
                    >
                        {renderItems}
                        {/* <MenuItem value={'0'}>компания HeadHunter</MenuItem> */}

                        <MenuItem value={'0'}>
                            <CreateCompanyBtn />
                        </MenuItem>
                    </Select>
                </FormControl>
            ) : (
                <CreateCompanyBtn />
            )}
        </>
    );
};

export default CompanySelect;
