import { FC, useCallback, useEffect, useState } from 'react';
import { Button } from '@mui/material';

import { Blip, RadarInterface } from '../../../components/radar/types';
import { openCreateBlipModal } from '../../../store/editRadarSlice';
import { useAppDispatch } from '../../../store/hooks';
import EditableLegendMain from './EditableLegendMain';
import SearchField from './SearchField';

import styles from './legend.module.less';

type Props = {
    radar: RadarInterface;
};

const getMatchingBlips = (query: string, blips: Blip[]) => {
    const transform = (value: string) => {
        const regex = /[^a-z0-9a-я]/g;
        return value.trim().toLowerCase().replace(regex, '');
    };
    query = transform(query);
    return blips.filter((blip) => transform(blip.name).includes(query));
};

const EditableLegend: FC<Props> = ({ radar }) => {
    const [visibleBlips, setVisibleBlips] = useState(radar.blips);
    const [isSearching, setIsSearching] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    const dispatch = useAppDispatch();

    const addBlipClickHandler = useCallback(() => {
        dispatch(openCreateBlipModal());
    }, [dispatch]);

    const changeHandler = useCallback(
        (value: string) => {
            value = value.trim();
            if (value) {
                setSearchValue(value);
                setIsSearching(true);
            } else {
                setSearchValue('');
                setIsSearching(false);
            }
        },
        [setSearchValue, setIsSearching]
    );

    const clearHandler = useCallback(() => {
        setIsSearching(false);
        setSearchValue('');
    }, [setIsSearching, setSearchValue]);

    useEffect(() => {
        if (isSearching) {
            setVisibleBlips(getMatchingBlips(searchValue, radar.blips));
        } else {
            setVisibleBlips(radar.blips);
        }
    }, [setVisibleBlips, searchValue, radar, isSearching]);

    return (
        <div className={styles.container}>
            <div className={styles.buttonContainer}>
                <Button color="success" variant="contained" size="small" onClick={addBlipClickHandler}>
                    Добавить
                </Button>
            </div>
            <SearchField onChange={changeHandler} clear={clearHandler} value={searchValue} />
            <EditableLegendMain
                rings={radar.rings}
                sectors={radar.sectors}
                blips={visibleBlips}
                isSearching={isSearching}
            />
        </div>
    );
};

export default EditableLegend;
