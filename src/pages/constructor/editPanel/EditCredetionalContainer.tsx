import { FC } from 'react';

import EditButton from '../components/EditButton';

import styles from './editCredetionals.module.less';

type Props = { label: string; value: string };

const EditCredetialContainer: FC<Props> = ({ label, value }) => {
    return (
        <div className={styles.container}>
            <div className={styles.label}>{label}</div>
            <div className={styles.valueContainer}>
                <h2 className={styles.value}>{value}</h2>
                <EditButton />
            </div>
        </div>
    );
};

export default EditCredetialContainer;
