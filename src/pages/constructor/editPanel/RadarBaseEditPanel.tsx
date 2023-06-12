import { FC } from 'react';

import { Ring, Sector } from '../../../components/radar/types';
import {
    openAddNewRingModal,
    openAddNewSectorModal,
    openEditRingModal,
    openEditSectorModal,
} from '../../../store/editRadarSlice';
import EditItemsDropDown from './EditItemsDropDown';

import styles from './radarBaseEditPanel.module.less';

type Props = {
    sectors: Sector[];
    rings: Ring[];
};

const RadarBaseEditPanel: FC<Props> = ({ sectors, rings }) => {
    return (
        <div className={styles.container}>
            <EditItemsDropDown
                label="Секторы"
                items={sectors}
                openModalActionCreator={openEditSectorModal}
                addItemActionCreator={openAddNewSectorModal}
            />
            <EditItemsDropDown
                label="Кольца"
                items={rings}
                openModalActionCreator={openEditRingModal}
                addItemActionCreator={openAddNewRingModal}
            />
        </div>
    );
};

export default RadarBaseEditPanel;
