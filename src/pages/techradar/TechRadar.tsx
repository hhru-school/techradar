import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { skipToken } from '@reduxjs/toolkit/dist/query';

import {
    useGetAllCompanyRadarsQuery,
    useGetAllRadarVersionsQuery,
    useGetLastReleasedVersionQuery,
    useGetRadarByVersionIdQuery,
    useGetVersionByIdQuery,
} from '../../api/companyRadarsApi';
import { isFetchBaseQueryError } from '../../api/helpers';
import ErrorMessage from '../../components/error/ErrorMessage';
import TechRadarMain from './components/main/TechRadarMain';
import SelectVersion from './components/selectMenu/SelectVersion';
import SelectRadarPanel from './components/selectRadarPanel/SelectRadarPanel';

export interface Version {
    id: number;
    name: string;
}

const TechRadar: FC = () => {
    const { companySlug, radarSlug, versionSlug } = useParams();

    const companyId = Number(companySlug);
    const radarId = Number(radarSlug);

    const isLatestVersion = versionSlug === 'latest';

    const { data: radars } = useGetAllCompanyRadarsQuery(companyId);
    const { data: lastReleaseVersion } = useGetLastReleasedVersionQuery(radarId, { skip: !isLatestVersion });

    const versionId = isLatestVersion ? lastReleaseVersion?.id : Number(versionSlug);

    const {
        data: radar,
        isFetching: radarIsFetching,
        error: radarError,
    } = useGetRadarByVersionIdQuery(versionId ?? skipToken);

    const { data: versions } = useGetAllRadarVersionsQuery(radarId, { skip: !radar });

    const { data: currentVersion } = useGetVersionByIdQuery(versionId ?? skipToken);

    if (radarError) {
        return <ErrorMessage errorStatus={isFetchBaseQueryError(radarError) ? radarError.status : null} />;
    }

    return (
        <>
            {radars && <SelectRadarPanel radars={radars} companyId={Number(companyId)} />}
            {versions && currentVersion && radar && (
                <SelectVersion versions={versions} version={currentVersion} companyId={1} radarId={radar.id} />
            )}
            {<TechRadarMain radar={radar} isLoading={radarIsFetching} />}
        </>
    );
};

export default TechRadar;
