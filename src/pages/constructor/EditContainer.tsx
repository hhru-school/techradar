import { FC } from 'react';

import EditPanel from './edit/EditPanel';
import DnDWrapper from './radarContainer/DnDWrapper';

const EditContainer: FC = () => {
    return (
        <>
            <EditPanel />
            <DnDWrapper />
        </>
    );
};

export default EditContainer;
