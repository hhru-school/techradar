import { FC } from 'react';
import { useParams } from 'react-router-dom';

import {
    useGetAllCompanyRadarsQuery,
    useGetAllRadarVersionsQuery,
    useGetRadarByVersionIdQuery,
} from '../../api/companyRadarsApi';
import { isFetchBaseQueryError } from '../../api/helpers';
import { VersionApiResponse } from '../../api/radarApiUtils';
// import { RadarVersionDataApi } from '../../api/radarApiUtils';
import ErrorMessage from '../../components/error/ErrorMessage';
import TechRadarMain from './components/main/TechRadarMain';
import SelectVersion from './components/selectMenu/SelectVersion';
import NavTabsContainer from './components/tab/NavTabsContainer';

export interface Version {
    id: number;
    name: string;
}

const getLastradarVersionId = (versions: VersionApiResponse[]) => {
    return versions[versions.length - 1].id;
};
const TechRadar: FC = () => {
    const { companySlug, radarSlug, versionSlug } = useParams();

    const companyId = Number(companySlug);
    const radarId = Number(radarSlug);

    const { data: radars, isLoading: radarsIsLoading } = useGetAllCompanyRadarsQuery(companyId);

    const { data: radarVersions } = useGetAllRadarVersionsQuery(radarId);

    let versionId = -1;
    if (radarVersions) {
        versionId = versionSlug === 'latest' ? getLastradarVersionId(radarVersions) : Number(versionSlug);
    }

    const {
        data: radar,
        isFetching: radarIsFetching,
        error: radarError,
    } = useGetRadarByVersionIdQuery(versionId, { skip: versionId < 0 });

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
            {radarVersions && (
                <SelectVersion
                    versions={radarVersions}
                    version={radarVersions.find((version) => version.id === versionId) || radarVersions[0]}
                    companyId={companyId}
                    radarId={radarId}
                />
            )}
            {<TechRadarMain radar={radar} isLoading={radarIsFetching} />}
        </>
    );
};

export default TechRadar;
