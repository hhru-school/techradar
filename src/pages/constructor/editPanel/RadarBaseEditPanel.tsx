import { FC } from 'react';

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
    sectorNames: string[];
    ringNames: string[];
};

const RadarBaseEditPanel: FC<Props> = ({ sectorNames, ringNames }) => {
    return (
        <div className={styles.container}>
            <EditItemsDropDown
                label="Секторы"
                itemNames={sectorNames}
                editBtnActionCreator={openEditSectorNameModal}
                deleteBtnActionCreator={openDeleteSectorModal}
                addItemActionCreator={openAddNewSectorModal}
            />
            <EditItemsDropDown
                label="Кольца"
                itemNames={ringNames}
                editBtnActionCreator={openEditRingNameModal}
                deleteBtnActionCreator={deleteRing}
                addItemActionCreator={openAddNewRingModal}
            />
        </div>
    );
};

export default RadarBaseEditPanel;
