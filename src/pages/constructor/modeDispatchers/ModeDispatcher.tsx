import { FC } from 'react';

import { ConstructorMode } from '../../../store/editRadarSlice';
import CreateNewVersionDispatcher from './CreateNewVersionDispatcher';

type Props = {
    mode: ConstructorMode;
};

const ModeDispatcher: FC<Props> = ({ mode }) => {
    if (mode === ConstructorMode.NewVersionCreation) return <CreateNewVersionDispatcher />;
    return null;
};

export default ModeDispatcher;
