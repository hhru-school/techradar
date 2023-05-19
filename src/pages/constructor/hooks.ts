import { FormattedRadarData } from '../../api/radarApiUtils';
import { useAppSelector } from '../../store/hooks';

export const useCurrentRadar = (): FormattedRadarData => {
    const ringNames = useAppSelector((state) => state.editRadar.ringNames);
    const sectorNames = useAppSelector((state) => state.editRadar.sectorNames);
    const blips = useAppSelector((state) => state.editRadar.blips);

    return { ringNames, sectorNames, blips };
};
