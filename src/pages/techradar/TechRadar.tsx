import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { skipToken } from '@reduxjs/toolkit/dist/query';

import { useGetAllCompanyRadarsQuery, useGetRadarByVersionIdQuery } from '../../api/companyRadarsApi';
import { isFetchBaseQueryError } from '../../api/helpers';
import ErrorMessage from '../../components/error/ErrorMessage';
import TechRadarMain from './components/main/TechRadarMain';
import NavTabsContainer from './components/tab/NavTabsContainer';

export interface Version {
    id: number;
    name: string;
}

// const getLastradarVersionId = (versions: RadarVersionDataApi[]) =>
//     versions.sort((versionA, versionB) => versionB.lastChangeTime.localeCompare(versionA.lastChangeTime))[0].id;

// const getVersionNameById = (versions: RadarVersionDataApi[], id: number): Version => {
//     const versionName = versions.find((version) => version.id === id)?.name || '';
//     return { id, name: versionName };
// };

const getVersionNameById = (versions: RadarVersionDataApi[], id: number): Version => {
    const versionName = versions.find((version) => version.id === id)?.name || '';
    return { id, name: versionName };
};

const TechRadar: FC = () => {
    const { companySlug, radarSlug, versionSlug } = useParams();

    const companyId = Number(companySlug);
    const radarId = Number(radarSlug);
    const versionId = Number(versionSlug);

    const { data: radars, isLoading: radarsIsLoading } = useGetAllCompanyRadarsQuery(companyId);

    const {
        data: radar,
        isFetching: radarIsFetching,
        error: radarError,
    } = useGetRadarByVersionIdQuery(versionId ?? skipToken);

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

            {<TechRadarMain radar={radar} isLoading={radarIsFetching} />}
        </>
    );
};

export default TechRadar;
