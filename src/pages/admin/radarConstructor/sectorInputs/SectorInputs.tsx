import { FC, useMemo } from 'react';
import { FormControl, InputLabel, List, NativeSelect, Typography } from '@mui/material';

import { TextInputStandart } from '../../../../components/textInputStandart/TextInputStandart';
import { updateSectorCount, updateSectorNames } from '../../../../store/constructorRadarSlice';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';

const optionsArr = [1, 2, 3, 4, 5, 6];

const SectorInputs: FC = () => {
    const dispatch = useAppDispatch();
    const countSectors = useAppSelector((state) => state.constructorRadar.countSectorInputs);

    const inputs = useMemo(
        () =>
            new Array(countSectors).fill(null).map((_, index) => (
                <TextInputStandart
                    key={index}
                    label={`Сектор ${index + 1}`}
                    id={`sectorName-${index + 1}`}
                    name={`sectorName-${index + 1}`}
                    type={'text'}
                    onChange={(e) => {
                        dispatch(updateSectorNames({ id: index, value: e.target.value.trim() }));
                    }}
                />
            )),
        [countSectors, dispatch]
    );

    return (
        <List
            sx={{
                width: '100%',
                bgcolor: 'background.paper',
                position: 'relative',
                overflow: 'auto',
            }}
        >
            <Typography sx={{ margin: '0 0 10px 9px' }} variant="h5">
                Секторы
            </Typography>
            <FormControl sx={{ width: '130px', marginLeft: '9px' }}>
                <InputLabel variant="standard" htmlFor="rings-count">
                    Количество
                </InputLabel>
                <NativeSelect
                    onChange={(e) => dispatch(updateSectorCount(+e.target.value))}
                    defaultValue={4}
                    inputProps={{
                        name: 'rings-count',
                        id: 'rings-count',
                    }}
                >
                    {optionsArr.map((num, i) => {
                        return (
                            <option className="options" key={i} value={num}>
                                {num}
                            </option>
                        );
                    })}
                </NativeSelect>
            </FormControl>
            {inputs}
        </List>
    );
};

export default SectorInputs;