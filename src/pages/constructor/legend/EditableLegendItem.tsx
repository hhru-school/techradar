import { FC, memo } from 'react';
import classNames from 'classnames';

import { clearActiveBlip, setActiveBlip } from '../../../store/activeBlipSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';

import styles from './legend.module.less';

type Props = {
    id: number;
    name: string;
};

const EditableLegendItem: FC<Props> = ({ id, name }) => {
    const activeBlipId = useAppSelector((state) => state.activeBlip.id);

    const isActive = activeBlipId === id;

    const dispatch = useAppDispatch();

    const onMouseEnterHandler = () => {
        dispatch(setActiveBlip(id));
    };

    const onMouseLeaveHandler = () => {
        dispatch(clearActiveBlip());
    };

    const contentClasses = classNames(styles.item, {
        [styles.itemActive]: isActive,
    });

    return (
        <li onMouseEnter={onMouseEnterHandler} onMouseLeave={onMouseLeaveHandler} className={contentClasses}>
            {`${id}. ${name}`}
        </li>
    );
};

export default memo(EditableLegendItem);
