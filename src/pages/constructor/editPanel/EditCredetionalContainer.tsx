import { FC } from 'react';

import EditButton from '../components/EditButton';

import styles from './editCredetionals.module.less';

type Props = { label: string; value: string; editable?: boolean };

const EditCredetialContainer: FC<Props> = ({ label, value, editable = true }) => {
    return (
        <div className={styles.container}>
            <div className={styles.label}>{label}</div>
            <div className={styles.valueContainer}>
                <h2 className={styles.value}>{value}</h2>
                {editable && <EditButton />}
            </div>
        </div>
    );
};

export default EditCredetialContainer;
