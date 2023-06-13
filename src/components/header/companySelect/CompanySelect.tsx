import {
    FC,
    // useEffect,
    useState,
} from 'react';
import { SelectChangeEvent, FormControl, Select, MenuItem, Button } from '@mui/material';

// import { useGetCompaniesQuery } from '../../../api/companiesApi';

const CompanySelect: FC = () => {
    // const { data: companies } = useGetCompaniesQuery();

    const [age, setAge] = useState('0');

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value);
    };

    // useEffect(() => {
    //     if (companies) setAge(`${companies[0].id}`);
    // }, [companies]);

    // const renderItems = companies ? (
    //     companies.map((company) => {
    //         return (
    //             <MenuItem key={company.id} value={company.id}>
    //                 {`компания ${company.name}`}
    //             </MenuItem>
    //         );
    //     })
    // ) : (
    //     <MenuItem value={'0'}>Нет компаний</MenuItem>
    // );

    return (
        <FormControl sx={{ m: 1, minWidth: 120 }}>
            <Select
                value={age}
                onChange={handleChange}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
                sx={{ m: 1, minWidth: 120, backgroundColor: 'white', height: '38px' }}
            >
                {/* {renderItems} */}
                <MenuItem value={'0'}>компания HeadHunter</MenuItem>
                <MenuItem>
                    <Button variant="contained" color="secondary">
                        Создать компанию
                    </Button>
                </MenuItem>
            </Select>
        </FormControl>
    );
};

export default CompanySelect;
