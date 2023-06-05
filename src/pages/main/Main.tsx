import { FC } from 'react';

import CompaniesBlock from './CompaniesBlock';
import NavContainer from './NavContainer';
import PresentationBlock from './PresentationBlock';

import styles from './main.module.less';

const Main: FC = () => {
    return (
        <>
            <NavContainer />
            <div className={styles.layout}>
                <h3 className={styles.header}>Техрадары компаний</h3>
                <CompaniesBlock />
                <h3 className={styles.header}>Что такое Техрадар?</h3>
                <PresentationBlock />
            </div>
        </>
    );
};

export default Main;
