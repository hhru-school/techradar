import { FC } from 'react';
import { Tabs } from '@mui/material';

import LinkTab from './LinkTab';

type Props = { radarId: number; radars: { id: number; name: string }[] };

const RadarsNavTabs: FC<Props> = ({ radarId, radars }) => {
    const tabs =
        radars &&
        radars.map((radar) => <LinkTab key={radar.id} label={radar.name} href={`./${radar.id}`} value={radar.id} />);
    return (
        <Tabs value={radarId} aria-label="radars of the company nav" variant="scrollable" scrollButtons="auto">
            {tabs}
        </Tabs>
    );
};

export default RadarsNavTabs;
