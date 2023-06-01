import { FC } from 'react';

import { Ring, Sector } from '../../../components/radar/types';
import {
    deleteRing,
    openAddNewRingModal,
    openAddNewSectorModal,
    openDeleteSectorModal,
    openEditRingNameModal,
    openEditSectorNameModal,
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
                editBtnActionCreator={openEditSectorNameModal}
                deleteBtnActionCreator={openDeleteSectorModal}
                addItemActionCreator={openAddNewSectorModal}
            />
            <EditItemsDropDown
                label="Кольца"
                items={rings}
                editBtnActionCreator={openEditRingNameModal}
                deleteBtnActionCreator={deleteRing}
                addItemActionCreator={openAddNewRingModal}
            />
        </div>
    );
};

export default RadarBaseEditPanel;
