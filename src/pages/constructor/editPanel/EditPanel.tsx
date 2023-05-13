import { FC } from 'react';
import { Publish, Save } from '@mui/icons-material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { IconButton } from '@mui/material';

import {
    deleteRing,
    openAddNewRingModal,
    openAddNewSectorModal,
    openDeleteSectorModal,
    openEditRingNameModal,
    openEditSectorNameModal,
} from '../../../store/editRadarSlice';
import { useAppSelector } from '../../../store/hooks';
import EditItemsDropDown from './EditItemsDropDown';
import RadarNameContainer from './RadarNameContainer';

import styles from './editPanel.module.less';

const EditPanel: FC = () => {
    const sectorNames = useAppSelector((state) => state.editRadar.sectorNames);
    const ringNames = useAppSelector((state) => state.editRadar.ringNames);

    return (
        <div className={styles.container}>
            <div className={styles.upper}>
                <RadarNameContainer />
                <div>
                    <IconButton color="success" title="Publish">
                        <Publish />
                    </IconButton>
                    <IconButton title="Save all">
                        <Save />
                    </IconButton>
                </div>
            </div>
            <div className={styles.lower}>
                <EditItemsDropDown
                    label="Секторы"
                    buttonIcon={<ArrowDropDownIcon />}
                    itemNames={sectorNames}
                    editBtnActionCreator={openEditSectorNameModal}
                    deleteBtnActionCreator={openDeleteSectorModal}
                    addItemActionCreator={openAddNewSectorModal}
                />
                <EditItemsDropDown
                    label="Кольца"
                    buttonIcon={<ArrowDropDownIcon />}
                    itemNames={ringNames}
                    editBtnActionCreator={openEditRingNameModal}
                    deleteBtnActionCreator={deleteRing}
                    addItemActionCreator={openAddNewRingModal}
                />
            </div>
        </div>
    );
};

export default EditPanel;
