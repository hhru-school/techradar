import { FC, useCallback, useEffect, useState } from 'react';

import { FormattedRadarData } from '../../../api/radarApiUtils';
import { Blip } from '../../../components/radar/types';
import EditableLegendMain from './EditableLegendMain';
import SearchField from './SearchField';

type Props = {
    radar: FormattedRadarData;
};

const getMatchingBlips = (query: string, blips: Blip[]) => {
    const transform = (value: string) => {
        const regex = /[^a-z0-9]/g;
        return value.trim().toLowerCase().replace(regex, '');
    };
    query = transform(query);
    return blips.filter((blip) => transform(blip.name).includes(query));
};

const EditableLegend: FC<Props> = ({ radar }) => {
    const [visibleBlips, setVisibleBlips] = useState(radar.blips);
    const [isSearching, setIsSearching] = useState(false);
    const [searchValue, setSearchValue] = useState('');

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

    const blurHandler = useCallback(() => {
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
        <div>
            <SearchField onChange={changeHandler} onBlur={blurHandler} value={searchValue} />
            <EditableLegendMain
                ringNames={radar.ringNames}
                sectorNames={radar.sectorNames}
                blips={visibleBlips}
                isSearching={isSearching}
            />
        </div>
    );
};

export default EditableLegend;
