import { FC, useMemo } from 'react';
import { FormControl, InputLabel, List, NativeSelect, Typography } from '@mui/material';

import { TextInputStandart } from '../../../../components/textInputStandart/TextInputStandart';
import { updateCircleCount } from '../../../../store/constructorRadarSlice';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';

const optionsArr = [1, 2, 3, 4, 5, 6];

const CircleInputs: FC = () => {
    const dispatch = useAppDispatch();
    const countRings = useAppSelector((state) => state.constructorRadar.countCircleInputs);

    const inputs = useMemo(
        () =>
            new Array(countRings).fill({}).map((_, index) => ({
                label: `Кольцо ${index + 1}`,
                id: `name-Circle-${index + 1}`,
                name: `nameCircle${index + 1}`,
                type: 'text',
                autoComplete: 'on',
            })),
        [countRings]
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
                    onChange={(e) => dispatch(updateCircleCount(+e.target.value))}
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
            {inputs.map((item, i) => (
                <TextInputStandart
                    key={i}
                    label={item.label}
                    id={item.id}
                    name={item.name}
                    type={item.type}
                    autoComplete={item.autoComplete}
                />
            ))}
        </List>
    );
};

export default CircleInputs;
