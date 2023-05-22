import { FC } from 'react';
import { useParams } from 'react-router-dom';

import {
    useGetAllCompanyRadarsQuery,
    useGetAllRadarVersionsQuery,
    useGetRadarByVersionIdQuery,
} from '../../api/companyRadarsApi';
import { isFetchBaseQueryError } from '../../api/helpers';
import { RadarVersionDataApi } from '../../api/radarApiUtils';
import ErrorMessage from '../../components/error/ErrorMessage';
import TechRadarMain from './components/main/TechRadarMain';
import NavTabsContainer from './components/tab/NavTabsContainer';

const getLastradarVersionId = (versions: RadarVersionDataApi[]) =>
    versions.sort((versionA, versionB) => versionB.lastChangeTime.localeCompare(versionA.lastChangeTime))[0].id;

const TechRadar: FC = () => {
    const { companySlug, radarSlug, versionSlug } = useParams();

    const companyId = Number(companySlug?.split('-')[1]);
    const radarId = Number(radarSlug?.split('-')[1]);

    const { data: radars, isLoading: radarsIsLoading } = useGetAllCompanyRadarsQuery(companyId);

    const { data: radarVersions } = useGetAllRadarVersionsQuery(radarId);

    let versionId = -1;

    if (radarVersions) {
        if (versionSlug === 'latest') {
            versionId = getLastradarVersionId(radarVersions);
        } else versionId = Number(versionSlug?.split('-')[1]);
    }

    const {
        data: radar,
        isFetching: radarIsFetching,
        error: radarError,
    } = useGetRadarByVersionIdQuery(versionId, { skip: !radarVersions });

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
