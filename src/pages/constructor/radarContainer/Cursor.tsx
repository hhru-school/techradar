import { FC } from 'react';

import { OnDropEvent } from '../../../store/editRadarSlice';
import { ReactComponent as Add } from '../icons/add.svg';
import { ReactComponent as Can } from '../icons/can.svg';
import { ReactComponent as Move } from '../icons/move.svg';
import { ReactComponent as NotAllowed } from '../icons/notAllowed.svg';

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

        case OnDropEvent.Add: {
            svg = <Add {...param} />;
            break;
        }

        case OnDropEvent.NotAllowed: {
            svg = <NotAllowed {...param} />;
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
