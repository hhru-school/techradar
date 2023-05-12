import { FC, useMemo } from 'react';
import { FormControl, InputLabel, List, NativeSelect, Typography } from '@mui/material';

import { TextInputStandart } from '../../../../components/textInputStandart/TextInputStandart';
import { updateRingCount, updateRingNames } from '../../../../store/constructorRadarSlice';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';

const optionsArr = [1, 2, 3, 4, 5, 6];

const RingInputs: FC = () => {
    const dispatch = useAppDispatch();
    const countRings = useAppSelector((state) => state.constructorRadar.countRingInputs);

    const inputs = useMemo(
        () =>
            new Array(countRings).fill(null).map((_, index) => (
                <TextInputStandart
                    key={index}
                    label={`Кольцо ${index + 1}`}
                    id={`ringName-${index + 1}`}
                    name={`ringName-${index + 1}`}
                    type={'text'}
                    onChange={(e) => {
                        dispatch(updateRingNames({ id: index, value: e.target.value.trim() }));
                    }}
                />
            )),
        [countRings, dispatch]
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
                Кольца
            </Typography>
            <FormControl sx={{ width: '130px', marginLeft: '9px' }}>
                <InputLabel variant="standard" htmlFor="Rings-count">
                    Количество колец
                </InputLabel>
                <NativeSelect
                    onChange={(e) => dispatch(updateRingCount(+e.target.value))}
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

export default RingInputs;
