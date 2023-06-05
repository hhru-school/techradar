import { FC } from 'react';
import { Avatar } from '@mui/material';

import { CompanyItemData } from '../CompaniesBlock';

import styles from './company.module.less';

type Props = {
    company: CompanyItemData;
};

const CompanyItem: FC<Props> = ({ company }) => {
    return (
        <li className={styles.companyItem}>
            <Avatar src={company.avatarUrl} />

            <div className={styles.companyName}>{company.name}</div>
        </li>
    );
};

export default CompanyItem;
