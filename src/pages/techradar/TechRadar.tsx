import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ArrowUpward } from '@mui/icons-material';
import { Fab, SxProps } from '@mui/material';

import {
    useGetAllCompanyRadarsQuery,
    useGetAllRadarVersionsQuery,
    useGetRadarByVersionIdQuery,
} from '../../api/companyRadarsApi';
import { isFetchBaseQueryError } from '../../api/helpers';
import ErrorMessage from '../../components/error/ErrorMessage';
import Layout from '../../components/layout/Layout';
import SymbolLegend from '../../components/symbolLegend/SymbolLegend';
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

const style: Record<string, SxProps> = {
    button: { position: 'fixed', top: '30px', right: '80px' },
};

const scrollOffset = 10;

const TechRadar: FC = () => {
    const currentVersionId = useAppSelector((state) => state.displayRadar.versionAsset.currentVersionId);

    const [scrollTop, setScrollTop] = useState(0);
    const [position, setPosition] = useState(0);

    const isButtonShows = scrollTop > position - scrollOffset;

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
    }, [dispatch, radar, versions, versionSlug]);

    useEffect(
        () => () => {
            dispatch(cleanUpPage());
        },
        [dispatch]
    );

    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (ref) {
            const bbox = ref.current?.getBoundingClientRect();
            const scrollTo = (bbox?.y as number) + window.scrollY - scrollOffset;
            document.documentElement.scrollTo(0, scrollTo);
            setPosition(scrollTo);
        }
    }, [radarId]);

    useEffect(() => {
        const handleScroll = () => {
            setScrollTop(window.scrollY);
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const clickHandler = useCallback(() => {
        document.documentElement.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }, []);

    if (radarError) {
        return <ErrorMessage errorStatus={isFetchBaseQueryError(radarError) ? radarError.status : null} />;
    }

    return (
        <Layout>
            {isButtonShows && (
                <Fab variant="extended" sx={style.button} color="info" onClick={clickHandler}>
                    <ArrowUpward /> К выбору радара
                </Fab>
            )}
            <TabContainer />
            <SymbolLegend />
            <div className={styles.main} ref={ref}>
                <RadarContainer />
                <LegendContainer />
            </div>
        </Layout>
    );
};

export default TechRadar;
