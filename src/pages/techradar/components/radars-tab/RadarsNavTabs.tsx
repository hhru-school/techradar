import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, Tab } from '@mui/material';

type Props = { radarId: number; companyId: number; radars: { id: number; name: string }[] };

const RadarsNavTabs: FC<Props> = ({ radarId, companyId, radars }) => {
    const navigate = useNavigate();

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        if (newValue !== radarId) {
            navigate(`/techradar/${companyId}/${newValue}`);
        }
    };

    const tabs = radars && radars.map((radar) => <Tab key={radar.id} label={radar.name} value={radar.id} />);

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

export default RadarsNavTabs;
