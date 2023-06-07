import { FC } from 'react';
import { Skeleton, SxProps } from '@mui/material';

import styles from './tabs.module.less';

const block: SxProps = { borderRadius: 1, fontSize: 14, height: '48px', width: '160px' };

const blocks = new Array(8).fill(null).map((_, i) => <Skeleton key={i} sx={block} />);

const SkeletonTab: FC = () => {
    return <div className={styles.skeleton}>{blocks}</div>;
};

export default SkeletonTab;
