import { FC } from 'react';

import { useAppSelector } from '../../store/hooks';
import EditContainer from './EditContainer';
import ModalEditSectorName from './modals/ModaEditSectorName';
import ModalCreateBlip from './modals/ModalCreateBlip';
import ModalMoveBlip from './modals/ModalMoveBlip';

const Constructor: FC = () => {
    const showCreateBlipModal = useAppSelector((state) => state.editRadar.showCreateBlipModal);
    const showMoveBlipRadar = useAppSelector((state) => state.editRadar.showMoveBlipModal);
    const showEditSectorNameModal = useAppSelector((state) => state.editRadar.showEditSectorNameModal);

    return (
        <>
            {showCreateBlipModal && <ModalCreateBlip open={true} />}
            {showMoveBlipRadar && <ModalMoveBlip open={true} />}
            {showEditSectorNameModal && <ModalEditSectorName />}
            <EditContainer />
        </>
    );
};

export default Constructor;
