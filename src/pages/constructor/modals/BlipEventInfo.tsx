import { FC } from 'react';
import { Alert } from '@mui/material';

import { Blip } from '../../../components/radar/types';
import { useAppSelector } from '../../../store/hooks';
import { getLastBlipEvents } from '../utils';

type Props = {
    blip: Blip;
    message: string;
};

const BlipEventInfo: FC<Props> = ({ blip, message }) => {
    const version = useAppSelector((state) => state.editRadar.version);
    const log = useAppSelector((state) => state.editRadar.log);

    const lastBlipEvent = getLastBlipEvents(log, version, blip).last;
    if (!lastBlipEvent) return null;
    return (
        <div>
            <div>{lastBlipEvent.id}</div>
            <div>{lastBlipEvent.blip?.name}</div>
            <Alert severity="warning">{message}</Alert>
        </div>
    );
};

export default BlipEventInfo;
