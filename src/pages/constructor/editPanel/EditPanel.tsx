import { FC } from 'react';
import AdjustOutlinedIcon from '@mui/icons-material/AdjustOutlined';
import DataUsageIcon from '@mui/icons-material/DataUsage';

import { deleteRing, deleteSector, renameRing, renameSector } from '../../../store/editRadarSlice';
import { useAppSelector } from '../../../store/hooks';
import EditItemsDropDown from './EditItemsDropDown';
import RadarNameContainer from './RadarNameContainer';

import styles from './editPanel.module.less';

const EditPanel: FC = () => {
    const sectorNames = useAppSelector((state) => state.editRadar.sectorNames);
    const ringNames = useAppSelector((state) => state.editRadar.ringNames);

    return (
        <div className={styles.editPanel}>
            <RadarNameContainer />
            <EditItemsDropDown
                label="Sectors"
                buttonIcon={<DataUsageIcon />}
                itemNames={sectorNames}
                editBtnActionCreator={renameSector}
                deleteBtnActionCreator={deleteSector}
            />
            <EditItemsDropDown
                label="Rings"
                buttonIcon={<AdjustOutlinedIcon />}
                itemNames={ringNames}
                editBtnActionCreator={renameRing}
                deleteBtnActionCreator={deleteRing}
            />
        </div>
    );
};

export default EditPanel;
