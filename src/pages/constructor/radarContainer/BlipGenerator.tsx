import { FC } from 'react';

import styles from './blipGenerator.module.less';

type Props = {
    onMouseDown: (event: React.MouseEvent) => void;
};

const dragHandler = (event: React.DragEvent) => {
    event.preventDefault();
};

const BlipGenerator: FC<Props> = ({ onMouseDown }) => {
    return (
        <div className={styles.generator} onDrag={dragHandler} onMouseDown={onMouseDown}>
            +
        </div>
    );
};

export default BlipGenerator;
