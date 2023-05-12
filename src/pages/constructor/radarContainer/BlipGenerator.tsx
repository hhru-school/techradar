import { FC } from 'react';
import { Add } from '@mui/icons-material';
import { Tooltip } from '@mui/material';
import classNames from 'classnames';

import { useAppSelector } from '../../../store/hooks';

import styles from './blipGenerator.module.less';

type Props = {
    onMouseDown: (event: React.MouseEvent) => void;
};

const dragHandler = (event: React.DragEvent) => {
    event.preventDefault();
};

const tooltipProps = {
    tooltip: {
        sx: {
            bgcolor: '#2196f3',
            '& .MuiTooltip-arrow': {
                color: '#2196f3',
            },
        },
    },
};

const BlipGenerator: FC<Props> = ({ onMouseDown }) => {
    const isCreating = useAppSelector((state) => state.editRadar.isCreating);

    const classes = classNames(styles.generator, {
        [styles.inactive]: isCreating,
        [styles.active]: !isCreating,
    });

    const component = (
        <div className={classes} onDrag={dragHandler} onMouseDown={onMouseDown}>
            {isCreating && 'Drop on place'}
            {!isCreating && <Add />}
        </div>
    );

    if (isCreating) return component;

    return (
        <Tooltip title={'Drag to add'} componentsProps={tooltipProps} arrow>
            {component}
        </Tooltip>
    );
};

export default BlipGenerator;
