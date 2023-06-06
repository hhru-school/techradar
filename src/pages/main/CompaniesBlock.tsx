import { FC } from 'react';

import CompanyList from './companies/CompanyList';

import styles from './main.module.less';

export interface CompanyItemData {
    id: number;
    name: string;
    avatarUrl: string;
}

const companiesMock = [
    {
        id: 1,
        name: 'HeadHunter',
        avatarUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/79/HeadHunter_logo.png',
    },

    {
        id: 2,
        name: 'Zalando',
        avatarUrl:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Zalando_201x_logo.svg/1200px-Zalando_201x_logo.svg.png',
    },
];

const CompaniesBlock: FC = () => {
    return (
        <div className={styles.companiesBlock}>
            <CompanyList companies={companiesMock} />
        </div>
    );
};

export default CompaniesBlock;
