import { FC } from 'react';
import InfoIcon from '@mui/icons-material/Info';

import styles from './versionStatusContainer.module.less';

type Props = {
    release: boolean;
};

const VersionStatusContainer: FC<Props> = ({ release }) => {
    const message = release ? 'Released' : 'Draft';
    return (
        <div className={styles.container}>
            <InfoIcon className={styles.content} />
            {message}
        </div>
    );
};

export default VersionStatusContainer;
