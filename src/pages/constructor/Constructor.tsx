import { FC } from 'react';

import EditContainer from './EditContainer';
import ModalCreateBlip from './modals/ModalCreateBlip';

const Constructor: FC = () => {
    return (
        <>
            <ModalCreateBlip open={true} />
            <EditContainer />
        </>
    );
};

export default Constructor;
