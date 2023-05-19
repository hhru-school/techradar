import { FC } from 'react';
import { useParams } from 'react-router-dom';

import { useGetAllCompanyRadarsQuery, useGetAllRadarVersionsQuery, useGetRadarQuery } from '../../api/companyRadarsApi';
import { isFetchBaseQueryError } from '../../api/helpers';
import ErrorMessage from '../../components/error/ErrorMessage';
import TechRadarMain from './components/main/TechRadarMain';
import NavTabsContainer from './components/tab/NavTabsContainer';

const TechRadar: FC = () => {
    const { companyId, radarId } = useParams();

    const { data: radars, isLoading: radarsIsLoading } = useGetAllCompanyRadarsQuery(Number(companyId));

    const { data: radarVersions } = useGetAllRadarVersionsQuery(Number(radarId));

    const {
        data: radar,
        isFetching: radarIsFetching,
        error: radarError,
    } = useGetRadarQuery(Number(radarId), { skip: !radarVersions });

    if (radarError) {
        return <ErrorMessage errorStatus={isFetchBaseQueryError(radarError) ? radarError.status : null} />;
    }

    return (
        <>
            <NavTabsContainer
                radarId={Number(radarId)}
                companyId={Number(companyId)}
                radars={radars}
                isLoading={radarsIsLoading}
            />
            <TechRadarMain radar={radar} isLoading={radarIsFetching} />
        </>
    );
};

export default TechRadar;
