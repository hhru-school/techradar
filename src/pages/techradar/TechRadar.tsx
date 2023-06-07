import { FC, useEffect, useLayoutEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
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
import Layout from '../../components/layout/Layout';
import {
    clearRadarDisplayAsset,
    setCompanyId,
    setCompanyRadars,
    setRadarDisplayAsset,
} from '../../store/displayRadarSlice';
import { useAppDispatch } from '../../store/hooks';
import LegendContainer from './components/legend/LegendContainer';
import RadarContainer from './components/radar/RadarContainer';
import TabContainer from './components/tab/TabContainer';

import styles from './techradar.module.less';

export interface Version {
    id: number;
    name: string;
}

const scroll = 64;

const TechRadar: FC = () => {
    const dispatch = useAppDispatch();

    const { companySlug, radarSlug, versionSlug } = useParams();

    const companyId = Number(companySlug);
    const radarId = Number(radarSlug);

    const isLatestVersion = versionSlug === 'latest';

    const { data: radars } = useGetAllCompanyRadarsQuery(companyId);
    const { data: lastReleaseVersion } = useGetLastReleasedVersionQuery(radarId, { skip: !isLatestVersion });

    const versionId = isLatestVersion ? lastReleaseVersion?.id : Number(versionSlug);

    const { data: radar, error: radarError } = useGetRadarByVersionIdQuery(versionId ?? skipToken);

    const { data: versions } = useGetAllRadarVersionsQuery(radarId, { skip: !radar });

    const { data: version } = useGetVersionByIdQuery(versionId ?? skipToken);

    useEffect(() => {
        dispatch(setRadarDisplayAsset({ radar, version, versions }));
        dispatch(setCompanyId(companyId));
        dispatch(setCompanyRadars(radars || null));
    }, [dispatch, radar, radars, companyId, version, versions]);

    const location = useLocation();

    useLayoutEffect(() => {
        document.documentElement.scrollTo(0, scroll);
        dispatch(clearRadarDisplayAsset());
    }, [location, dispatch]);

    if (radarError) {
        return <ErrorMessage errorStatus={isFetchBaseQueryError(radarError) ? radarError.status : null} />;
    }

    return (
        <Layout>
            <TabContainer />
            <div className={styles.main}>
                <RadarContainer />
                <LegendContainer />
            </div>
        </Layout>
    );
};

export default TechRadar;
