import { FC, useCallback, useState } from 'react';
import { Tabs } from '@mui/material';

import LinkTab from './LinkTab';
import { RradarNameToLink } from './radarNavApi';

type Props = { tabData: RradarNameToLink[] };

const RadarsNavTabs: FC<Props> = ({ tabData }) => {
    const [value, setValue] = useState(0);

    const handleChange = useCallback((event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    }, []);

    const tabs = tabData.map((tabItem) => <LinkTab label={tabItem.radarName} href={tabItem.href} />);
    return (
        <Tabs value={value} onChange={handleChange} aria-label="radars of the company nav">
            {tabs}
        </Tabs>
    );
};

export default RadarsNavTabs;
