import { FC } from 'react';
import { Tab } from '@mui/material';

type Props = {
    label: string;
    href: string;
};

const onClickHandler = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();
};

const LinkTab: FC<Props> = ({ label, href }) => {
    return <Tab component="a" onClick={onClickHandler} label={label} href={href} />;
};

export default LinkTab;
