import { FC } from 'react';
import { useParams } from 'react-router-dom';

import { useGetAllCompanyRadarsQuery, useGetRadarQuery } from '../../api/companyRadarsApi';
import TechRadarMain from './components/main/TechRadarMain';
import NavTabsContainer from './components/tab/NavTabsContainer';

const TechRadar: FC = () => {
    const { companyId, radarId } = useParams();

    const { data: radars, isLoading: radarsIsLoading } = useGetAllCompanyRadarsQuery(Number(companyId));

    const { data: radar, isLoading: radarIsLoading, isFetching } = useGetRadarQuery(Number(radarId));

    return (
        <>
            <NavTabsContainer
                radarId={Number(radarId)}
                companyId={Number(companyId)}
                radars={radars}
                isLoading={radarsIsLoading}
            />
            <TechRadarMain radar={radar} isLoading={radarIsLoading || isFetching} />
        </>
    );
};

export default TechRadar;
