import { FC } from 'react';
import { Button, ButtonGroup } from '@mui/material';

import styles from './main.module.less';

const NavContainer: FC = () => {
    return (
        <div className={styles.nav}>
            <ButtonGroup variant="text">
                <Button>Личный кабинет</Button>
                <Button>Построить радар</Button>
                <Button>FAQ</Button>
            </ButtonGroup>
        </div>
    );
};

export default NavContainer;
