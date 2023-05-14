import { FC, useState } from 'react';

import { RadarComponentVariant } from '../../../../components/radar/types';
import { clearActiveBlip, setActiveBlip, setOpenDescription } from '../../../../store/activeBlipSlice';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import DropDown from './DropDown';
import LegendItemEditMenu from './LegendItemEditMenu';

import styles from './legend.module.less';

type Props = {
    id: number;
    name: string;
    description: string | null;
    variant?: RadarComponentVariant;
};

const LegendItem: FC<Props> = ({ id, name, description, variant = RadarComponentVariant.Demonstrative }) => {
    const activeId = useAppSelector((state) => state.activeBlip.id);
    const open = useAppSelector((state) => state.activeBlip.openDescription);

    const isEditable = variant === RadarComponentVariant.Editable;

    const dispatch = useAppDispatch();

    const onClickHandler = () => {
        dispatch(setActiveBlip(id));
        dispatch(setOpenDescription(!open));
    };

    const [openEditMenu, setOpenEditMenu] = useState(false);

    const onMouseEnterHandler = () => {
        dispatch(setActiveBlip(id));

        if (isEditable) {
            setOpenEditMenu(true);
        }
    };

    const onMouseLeaveHandler = () => {
        if (isEditable) {
            setOpenEditMenu(false);
        }
        dispatch(clearActiveBlip());
    };

    return (
        <>
            <li
                onClick={onClickHandler}
                onMouseEnter={onMouseEnterHandler}
                onMouseLeave={onMouseLeaveHandler}
                className={styles.item}
            >
                <DropDown
                    title={`${id}. ${name}`}
                    details={description}
                    open={open && activeId === id}
                    active={activeId === id}
                />
                {isEditable && openEditMenu && <LegendItemEditMenu />}
            </li>
        </>
    );
};

export default LegendItem;
