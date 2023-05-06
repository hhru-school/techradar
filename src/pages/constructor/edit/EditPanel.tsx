import { FC } from 'react';

import NewBlipDragItem from './NewBlipDragItem';

import styles from './editPanel.module.less';

const EditPanel: FC = () => {
    return (
        <div className={styles.panel}>
            <NewBlipDragItem />
        </div>
    );
};

export default EditPanel;
