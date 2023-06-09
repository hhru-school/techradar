import { FC, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Tabs, Tab } from '@mui/material';

import { clearActiveBlip } from '../../../../store/activeBlipSlice';
import { clearActiveSector } from '../../../../store/displayRadarSlice';
import { useAppDispatch } from '../../../../store/hooks';

type Props = { radarId: number; companyId: number; radars: { id: number; name: string }[] };

const NavTabs: FC<Props> = ({ radarId, companyId, radars }) => {
    const dispatch = useAppDispatch();

    const handleChange = useCallback(
        (event: React.SyntheticEvent, newValue: number) => {
            if (newValue !== radarId) {
                dispatch(clearActiveSector());
                dispatch(clearActiveBlip());
            }
        },
        [radarId, dispatch]
    );

    const tabs = useMemo(
        () =>
            radars?.map((radar) => (
                <Tab
                    key={radar.id}
                    label={radar.name}
                    value={radar.id}
                    component={Link}
                    to={`/techradar/${companyId}/${radar.id}`}
                />
            )),
        [radars, companyId]
    );

    return (
        <Tabs
            onChange={handleChange}
            value={radarId}
            aria-label="radars of the company nav"
            variant="scrollable"
            scrollButtons="auto"
        >
            {tabs}
        </Tabs>
    );
};

export default NavTabs;
