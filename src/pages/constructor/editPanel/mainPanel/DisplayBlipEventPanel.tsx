import { FC, useCallback } from 'react';
import { Button } from '@mui/material';

import { setShowSwitchReleaseModal } from '../../../../store/editRadarSlice';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import EditCredetialContainer from '../EditCredetionalContainer';

const getFormatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return `${date.toLocaleDateString()}, ${date.toLocaleTimeString()}`;
};

const DisplayBlipEventPanel: FC = () => {
    const dispatch = useAppDispatch();

    const name = useAppSelector((state) => state.editRadar.radar.name);
    const blipEvent = useAppSelector((state) => state.editRadar.blipEvent);

    const clickHandler = useCallback(() => {
        dispatch(setShowSwitchReleaseModal(true));
    }, [dispatch]);

    return (
        <>
            <EditCredetialContainer label={'Название радара'} value={name} editable={false} />
            {blipEvent && <EditCredetialContainer label={'Событие'} value={String(blipEvent?.id)} editable={false} />}
            {blipEvent && (
                <EditCredetialContainer
                    label={'Событие'}
                    value={getFormatDate(blipEvent?.lastChangeTime)}
                    editable={false}
                />
            )}
            <Button variant="contained" color="secondary" onClick={clickHandler}>
                Привязать версию
            </Button>
        </>
    );
};

export default DisplayBlipEventPanel;
