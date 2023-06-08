import { FC, useEffect, useLayoutEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import {
    useGetAllCompanyRadarsQuery,
    useGetAllRadarVersionsQuery,
    useGetRadarByVersionIdQuery,
} from '../../api/companyRadarsApi';
import { isFetchBaseQueryError } from '../../api/helpers';
import ErrorMessage from '../../components/error/ErrorMessage';
import Layout from '../../components/layout/Layout';
import {
    VersionSettingData,
    cleanUpPage,
    cleanUpRadar,
    setCompanyId,
    setCompanyRadars,
    setRadar,
    setVersionAsset,
} from '../../store/displayRadarSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
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
    const currentVersionId = useAppSelector((state) => state.displayRadar.versionAsset.currentVersionId);

    const dispatch = useAppDispatch();

    const { companySlug, radarSlug, versionSlug } = useParams();

    const companyId = Number(companySlug);
    const radarId = Number(radarSlug);

    const { data: companyRadars } = useGetAllCompanyRadarsQuery(companyId);

    const { data: versions } = useGetAllRadarVersionsQuery(radarId);

    const { data: radar, error: radarError } = useGetRadarByVersionIdQuery(currentVersionId, {
        skip: currentVersionId <= 0,
    });

    useEffect(() => {
        dispatch(setCompanyId(companyId));
        if (companyRadars) {
            dispatch(setCompanyRadars(companyRadars));
        }
    }, [dispatch, companyId, companyRadars]);

    useEffect(() => {
        if (radar) {
            dispatch(setRadar(radar));
        }
        return () => {
            dispatch(cleanUpRadar());
        };
    }, [dispatch, radar]);

    useEffect(() => {
        if (versions) {
            const versionAsset: VersionSettingData =
                versionSlug === 'latest'
                    ? { versions, displayLatest: true }
                    : { versions, displayVersionId: Number(versionSlug) };

            dispatch(setVersionAsset(versionAsset));
        }
    }, [dispatch, versions, versionSlug]);

    const location = useLocation();

    useEffect(
        () => () => {
            dispatch(cleanUpPage());
        },
        [dispatch]
    );

    useLayoutEffect(() => {
        document.documentElement.scrollTo(0, scroll);
    }, [location]);

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
