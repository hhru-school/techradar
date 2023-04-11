import { FC } from 'react';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';

const columns: GridColDef[] = [
    { field: 'companieName', headerName: 'Название компании', width: 180, sortable: true },
    { field: 'radarsLink', headerName: 'Действующие радары', width: 170 },
    { field: 'publicRadars', headerName: 'Виды радаров использует', width: 570 },
    { field: 'link', headerName: 'Сайт', width: 150 },
    {
        field: 'fullName',
        headerName: 'Полное название',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
    },
    {
        field: 'fieldOfActivity',
        headerName: 'Сфера деятельности',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 300,
    },
];

const rows: GridRowsProp = [
    {
        id: 1,
        companieName: 'HH.ru',
        radarsLink: 'ссылка',
        publicRadars: 'Android, Backend, Data Science, Frontend, IOS, QA Infrastructure, DataWarehouse',
        link: 'https://hh.ru/',
        fullName: 'HeadHunter',
        fieldOfActivity: 'Интернет-рекрутмент, IT',
    },
    {
        id: 2,
        companieName: 'HH.ru',
        radarsLink: 'ссылка',
        publicRadars: 'Android, Backend, Data Science, Frontend, IOS, QA Infrastructure, DataWarehouse',
        link: 'https://hh.ru/',
        fullName: 'HeadHunter',
        fieldOfActivity: 'Интернет-рекрутмент, IT',
    },
    {
        id: 3,
        companieName: 'HH.ru',
        radarsLink: 'ссылка',
        publicRadars: 'Android, Backend, Data Science, Frontend, IOS, QA Infrastructure, DataWarehouse',
        link: 'https://hh.ru/',
        fullName: 'HeadHunter',
        fieldOfActivity: 'Интернет-рекрутмент, IT',
    },
    {
        id: 4,
        companieName: 'HH.ru',
        radarsLink: 'ссылка',
        publicRadars: 'Android, Backend, Data Science, Frontend, IOS, QA Infrastructure, DataWarehouse',
        link: 'https://hh.ru/',
        fullName: 'HeadHunter',
        fieldOfActivity: 'Интернет-рекрутмент, IT',
    },
    {
        id: 5,
        companieName: 'HH.ru',
        radarsLink: 'ссылка',
        publicRadars: 'Android, Backend, Data Science, Frontend, IOS, QA Infrastructure, DataWarehouse',
        link: 'https://hh.ru/',
        fullName: 'HeadHunter',
        fieldOfActivity: 'Интернет-рекрутмент, IT',
    },
];

const Companies: FC = () => {
    return (
        <div style={{ height: 'calc(100vh - 68.5px)', width: '100%' }}>
            <DataGrid rows={rows} columns={columns} />
        </div>
    );
};

export default Companies;
