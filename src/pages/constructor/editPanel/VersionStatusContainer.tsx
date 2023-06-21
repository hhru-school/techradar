import { FC } from 'react';
import InfoIcon from '@mui/icons-material/Info';
import { SxProps } from '@mui/material';

import styles from './versionStatusContainer.module.less';

type Props = {
    release: boolean;
};

const iconStyle: SxProps = { width: 18, height: 18 };

const VersionStatusContainer: FC<Props> = ({ release }) => {
    const message = release ? 'Released' : 'Draft';
    return (
        <div className={styles.container}>
            <InfoIcon className={styles.content} sx={iconStyle} />
            {message}
        </div>
    );
};

export default VersionStatusContainer;
