import { FC, useMemo } from 'react';

import { CompanyItemData } from '../CompaniesBlock';
import CompanyItem from './CompanyItem';

import styles from './company.module.less';

type Props = {
    companies: CompanyItemData[];
};

const CompanyList: FC<Props> = ({ companies }) => {
    const items = useMemo(() => companies.map((company) => <CompanyItem company={company} />), [companies]);
    return <ul className={styles.list}>{items}</ul>;
};

export default CompanyList;
