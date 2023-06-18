import { FC } from 'react';
import { Alert } from '@mui/material';

import { IndexBlipEventApi } from '../../../api/types';

type Props = {
    blipEvent?: IndexBlipEventApi;
    message: string;
};

const BlipEventInfo: FC<Props> = ({ blipEvent, message }) => {
    if (!blipEvent) return <div>Loading...</div>;
    return (
        <div>
            <div>{blipEvent.id}</div>
            <div>{blipEvent.blip?.name}</div>
            <Alert severity="warning">{message}</Alert>
        </div>
    );
};

export default BlipEventInfo;
