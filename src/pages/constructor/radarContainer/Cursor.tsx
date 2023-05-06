import { FC } from 'react';

import { ReactComponent as Can } from '../icons/can.svg';
import { ReactComponent as Move } from '../icons/move.svg';

import styles from './wrapper.module.less';

export enum CursorType {
    Delete = 'delete',
    Add = 'add',
    Move = 'move',
}

type Props = {
    type: CursorType;
    x?: number;
    y?: number;
};

const param = { width: '20px', height: '20px', pointerEvents: 'none' };

const Cursor: FC<Props> = ({ type, x = 0, y = 0 }) => {
    let svg;
    switch (type) {
        case CursorType.Delete: {
            svg = <Can {...param} />;
            break;
        }
        case CursorType.Move: {
            svg = <Move {...param} />;
            break;
        }

        default: {
            svg = null;
        }
    }

    return (
        <div className={styles.cursor} style={{ left: x, top: y }}>
            {svg}
        </div>
    );
};

export default Cursor;
