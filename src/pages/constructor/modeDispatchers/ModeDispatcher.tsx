import { FC, memo } from 'react';

import { ConstructorMode } from '../../../store/editRadarSlice';
import EditVersionDispatcher from './EditVersionDispatcher';

type Props = {
    mode: ConstructorMode;
};

const ModeDispatcher: FC<Props> = ({ mode }) => {
    if (mode === ConstructorMode.VersionEditing) return <EditVersionDispatcher />;
    return null;
};

export default memo(ModeDispatcher);
