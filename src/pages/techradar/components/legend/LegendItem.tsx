import { FC } from 'react';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';

import { clearActiveBlip, setActiveBlip } from '../../../../store/activeBlipSlice';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';

import styles from './legend.module.less';

type Props = { id: number; name: string; description?: string };

const LegendItem: FC<Props> = ({ id, name, description = '' }) => {
    const activeId = useAppSelector((state) => state.activeBlip.id);

    const dispatch = useAppDispatch();

    const mouseEnterHandler = () => {
        dispatch(setActiveBlip(id));
    };

    const mouseLeaveHandler = () => {
        dispatch(clearActiveBlip());
    };

    return (
        <li
            className={activeId === id ? `${styles.itemActive} ${styles.item}` : styles.item}
            onMouseEnter={mouseEnterHandler}
            onMouseLeave={mouseLeaveHandler}
        >
            <Accordion style={{ boxShadow: 'none', padding: 0 }}>
                <AccordionSummary style={{ padding: 0 }}>{`${id}. ${name}`}</AccordionSummary>
                <AccordionDetails>{description}</AccordionDetails>
            </Accordion>
        </li>
    );
};

export default LegendItem;
