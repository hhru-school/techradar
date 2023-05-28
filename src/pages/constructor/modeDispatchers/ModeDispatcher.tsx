import { FC } from 'react';

import { ConstructorMode } from '../../../store/editRadarSlice';
import CreateNewVersionDispatcher from './CreateNewVersionDispatcher';
import EditVersionDispatcher from './EditVersionDispatcher';

type Props = {
    mode: ConstructorMode;
};

const ModeDispatcher: FC<Props> = ({ mode }) => {
    if (mode === ConstructorMode.NewVersionCreation) return <CreateNewVersionDispatcher />;
    if (mode === ConstructorMode.VersionEditing) return <EditVersionDispatcher />;
    return null;
};

export default ModeDispatcher;
