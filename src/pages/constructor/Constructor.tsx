import { FC } from 'react';

import CreateModeConstructor from './CreateModeConstructor';
import EditModeConstructor from './EditModeConstructor';
import MainEditPanel from './editPanel/MainEditPanel';
import Modals from './modals/Modals';

type Props = { mode?: 'edit' | 'new' };

const Constructor: FC<Props> = ({ mode = 'new' }) => {
    return (
        <>
            <Modals />
            <MainEditPanel />
            {mode === 'new' && <CreateModeConstructor />}
            {mode === 'edit' && <EditModeConstructor />}
        </>
    );
};

export default Constructor;
