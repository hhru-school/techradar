import { FC } from 'react';

import EditButton from './EditButton';

import styles from './propertyItem.module.less';

type Props = { label: string; value: string; editable?: boolean; clickHandler?: () => void };

const PropertyItem: FC<Props> = ({ label, value, editable = true, clickHandler }) => {
    return (
        <div className={styles.container}>
            <div className={styles.label}>{label}</div>
            <div className={styles.valueContainer}>
                <h2 className={styles.value}>{value}</h2>
                {editable && clickHandler && <EditButton onClick={clickHandler} />}
            </div>
        </div>
    );
};

export default PropertyItem;
