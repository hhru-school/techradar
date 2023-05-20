import { FC } from 'react';
import { useParams } from 'react-router-dom';

import {
    useGetAllCompanyRadarsQuery,
    useGetAllRadarVersionsQuery,
    useGetRadarByVersionIdQuery,
} from '../../api/companyRadarsApi';
import { isFetchBaseQueryError } from '../../api/helpers';
import { RadarVersionDataApi, SlugPrefix, getIdFromSlug } from '../../api/radarApiUtils';
import ErrorMessage from '../../components/error/ErrorMessage';
import TechRadarMain from './components/main/TechRadarMain';
import NavTabsContainer from './components/tab/NavTabsContainer';

const getLastradarVersion = (versions: RadarVersionDataApi[]) =>
    versions.sort((versionA, versionB) => versionB.lastChangeTime.localeCompare(versionA.lastChangeTime))[0];

const TechRadar: FC = () => {
    const { companySlug, radarSlug } = useParams();

    const companyId = getIdFromSlug(String(companySlug), SlugPrefix.Company);
    const radarId = getIdFromSlug(String(radarSlug), SlugPrefix.Radar);

    const { data: radars, isLoading: radarsIsLoading } = useGetAllCompanyRadarsQuery(companyId);

    const { data: radarVersions } = useGetAllRadarVersionsQuery(radarId);

    const lastVersionId = radarVersions && getLastradarVersion(radarVersions).id;

    const {
        data: radar,
        isFetching: radarIsFetching,
        error: radarError,
    } = useGetRadarByVersionIdQuery(Number(lastVersionId), { skip: !radarVersions });

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
