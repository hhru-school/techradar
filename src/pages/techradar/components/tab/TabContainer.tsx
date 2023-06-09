import { FC } from 'react';

import SelectRadarPanel from '../../../../components/selectRadarPanel/SelectRadarPanel';
import { useAppSelector } from '../../../../store/hooks';
import SkeletonTab from './SkeletonTab';

const TabContainer: FC = () => {
    const radars = useAppSelector((state) => state.displayRadar.companyRadars);
    const companyId = useAppSelector((state) => state.displayRadar.companyId);
    if (radars) return <SelectRadarPanel radars={radars} companyId={companyId} />;
    return <SkeletonTab />;
};

export default TabContainer;
