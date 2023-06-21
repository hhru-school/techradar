import { FC } from 'react';

import { DrawInfo } from '../radar/types';
import SymbolLegendIcon from './SymbolLegendIcon';

import styles from './symbolLegend.module.less';

type Props = {
    color: string;
    size: number;
    drawInfo: DrawInfo;
    description: string;
};

const SymbolLegendItem: FC<Props> = ({ color, size, drawInfo, description }) => {
    return (
        <div className={styles.item}>
            <SymbolLegendIcon color={color} size={size} drawInfo={drawInfo} />
            <div className={styles.description}>{description}</div>
        </div>
    );
};

export default SymbolLegendItem;
