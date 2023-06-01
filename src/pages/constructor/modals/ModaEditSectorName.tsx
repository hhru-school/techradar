import { FC } from 'react';

import { getSectorNames } from '../../../components/radar/utils';
import { closeEditSectorNameModal, renameSector } from '../../../store/editRadarSlice';
import { useAppSelector } from '../../../store/hooks';
import ModalRename from './ModalBasic';

const ModalEditSectorName: FC = () => {
    const editingSector = useAppSelector((state) => state.editRadar.editingSector);
    const sectorNames = useAppSelector((state) => getSectorNames(state.editRadar.radar));

    if (editingSector) {
        return (
            <ModalRename
                open={true}
                item={editingSector}
                names={sectorNames}
                header={'Edit sector name'}
                inputLabel={'Sector name'}
                cancelBtnActionCreator={closeEditSectorNameModal}
                submitBtnActionCreator={renameSector}
            ></ModalRename>
        );
    }
    return null;
};

export default ModalEditSectorName;
