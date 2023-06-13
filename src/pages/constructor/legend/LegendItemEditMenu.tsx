import { FC, useCallback } from 'react';
import { Delete, Edit } from '@mui/icons-material';
import { IconButton } from '@mui/material';

import { ConstructorMode, openDeleteBlipModal, openEditBlipModal } from '../../../store/editRadarSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';

import styles from './legend.module.less';

type Props = { id: number };

const mouseDownHandler = (event: React.SyntheticEvent) => {
    event.stopPropagation();
};

const LegendItemEditMenu: FC<Props> = ({ id }) => {
    const dispatch = useAppDispatch();

    const mode = useAppSelector((state) => state.editRadar.mode);

    const isNewRadar = mode === ConstructorMode.NewRadarCreation;

    const editClickHandler = useCallback(
        (event: React.SyntheticEvent) => {
            event.stopPropagation();
            dispatch(openEditBlipModal(id));
        },
        [id, dispatch]
    );

    const deleteClickHandler = useCallback(
        (event: React.SyntheticEvent) => {
            event.stopPropagation();
            dispatch(openDeleteBlipModal(id));
        },
        [id, dispatch]
    );

    return (
        <div className={styles.itemEditMenu} onMouseDown={mouseDownHandler}>
            {!isNewRadar && (
                <IconButton onClick={editClickHandler}>
                    <Edit />
                </IconButton>
            )}
            <IconButton onClick={deleteClickHandler}>
                <Delete />
            </IconButton>
        </div>
    );
};

export default LegendItemEditMenu;
