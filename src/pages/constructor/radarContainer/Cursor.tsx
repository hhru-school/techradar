import { FC } from 'react';

import { OnDropEvent } from '../../../store/editRadarSlice';
import { ReactComponent as Can } from '../icons/can.svg';
import { ReactComponent as Move } from '../icons/move.svg';

import styles from './wrapper.module.less';

type Props = {
    onDropEvent: OnDropEvent | null;
    x?: number;
    y?: number;
};

const param = { width: '20px', height: '20px', pointerEvents: 'none' };

const Cursor: FC<Props> = ({ onDropEvent, x = 0, y = 0 }) => {
    let svg;
    switch (onDropEvent) {
        case OnDropEvent.Delete: {
            svg = <Can {...param} />;
            break;
        }
        case OnDropEvent.Move: {
            svg = <Move {...param} />;
            break;
        }

        default: {
            return null;
        }
    }

    return (
        <div className={styles.cursor} style={{ left: x, top: y }}>
            {svg}
        </div>
    );
};

export default Cursor;
