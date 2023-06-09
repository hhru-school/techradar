import { FC, memo } from 'react';

import SymbolLegendItem from './SymbolLegendItem';

import styles from './symbolLegend.module.less';

const fixedMessage = 'Без изменений';
const newMessage = 'Новая';
const forwardMessage = 'Перемещена к центру';
const backwardMessage = 'Перемещена от центра';
const secMoveMessage = 'Перемещена из другого сектора';

const color = 'rgb(106, 115, 123)';
const size = 18;

const SymbolLegend: FC = () => {
    return (
        <div className={styles.legend}>
            <SymbolLegendItem color={color} size={size * 1.2} drawInfo="FIXED" description={fixedMessage} />
            <SymbolLegendItem color={color} size={size} drawInfo="NEW" description={newMessage} />
            <SymbolLegendItem color={color} size={size} drawInfo="FORWARD" description={forwardMessage} />
            <SymbolLegendItem color={color} size={size} drawInfo="BACKWARD" description={backwardMessage} />
            <SymbolLegendItem color={color} size={size} drawInfo="SEC_MOVE" description={secMoveMessage} />
        </div>
    );
};

export default memo(SymbolLegend);
