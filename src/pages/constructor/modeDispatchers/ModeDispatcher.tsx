import { FC, memo } from 'react';

import { ConstructorMode } from '../../../store/editRadarSlice';
import CreateNewVersionDispatcher from './CreateNewVersionDispatcher';
import EditVersionDispatcher from './EditVersionDispatcher';
import EventDisplayDispatcher from './EventDisplayDispatcher';

type Props = {
    mode: ConstructorMode;
};

const ModeDispatcher: FC<Props> = ({ mode }) => {
    if (mode === ConstructorMode.NewVersionCreation) return <CreateNewVersionDispatcher />;
    if (mode === ConstructorMode.VersionEditing) return <EditVersionDispatcher />;
    if (mode === ConstructorMode.DisplayEvent) return <EventDisplayDispatcher />;
    return null;
};

export default memo(ModeDispatcher);
