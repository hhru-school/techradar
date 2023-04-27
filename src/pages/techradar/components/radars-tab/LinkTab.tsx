import { FC } from 'react';
import { Tab } from '@mui/material';

type Props = {
    label: string;
    href: string;
    value: number;
};

// const onClickHandler = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
//     event.preventDefault();
// };

const LinkTab: FC<Props> = ({ label, href, value }) => {
    return <Tab component="a" label={label} href={href} value={value} />;
};

export default LinkTab;
