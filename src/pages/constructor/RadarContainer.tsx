import { FC } from 'react';

import { RadarInterface } from '../../components/radar/types';
import SymbolLegend from '../../components/symbolLegend/SymbolLegend';
import { ConstructorMode } from '../../store/editRadarSlice';
import { useAppSelector } from '../../store/hooks';
import EditWrapper from './radarContainer/EditWrapper';

import styles from './editContainer.module.less';

type Props = {
    radar: RadarInterface;
};

const RadarContainer: FC<Props> = ({ radar }) => {
    const mode = useAppSelector((state) => state.editRadar.mode);

    const isEdit = mode === ConstructorMode.VersionEditing;

    return (
        <div className={styles.layout}>
            {isEdit && <SymbolLegend />}
            <EditWrapper radar={radar} />
        </div>
    );
};

export default RadarContainer;
