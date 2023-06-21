import { FC } from 'react';
import { useParams } from 'react-router-dom';

import { useGetCompanyNameQuery } from '../../../../api/companyRadarsApi';
import Layout from '../../../../components/layout/Layout';

import styles from './companyName.module.less';

const CompanyNameContainer: FC = () => {
    const { companySlug } = useParams();

    const { data } = useGetCompanyNameQuery(Number(companySlug));

    return (
        <div className={styles.container}>
            <Layout>
                <h1>{data}</h1>
            </Layout>
        </div>
    );
};

export default CompanyNameContainer;
