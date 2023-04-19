import { FC, useState, SetStateAction, useEffect } from 'react';
import { FormControl, InputLabel, List, NativeSelect, Typography } from '@mui/material';

import { updateCercleCount } from '../../../../store/dataSlice';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { MyTextInput, InputProps } from '../RadarConstructor';

const CercleInputs: FC = () => {
    const dispatch = useAppDispatch();
    const countCercles = useAppSelector((state) => state.data.countCercleInputs);
    const [cercleInputsData, setCercleInputsData] = useState<Array<InputProps>>([
        {
            label: 'Название кольца',
            id: `name-cercle`,
            name: `nameCercle`,
            type: 'text',
            autoComplete: 'off',
        },
    ]);

    useEffect(() => {
        const arr: SetStateAction<InputProps[]> = [];
        for (let i = 0; i < countCercles; i++) {
            arr.push({
                label: `Кольцо ${i + 1}`,
                id: `name-cercle-${i + 1}`,
                name: `nameCercle${i + 1}`,
                type: 'text',
                autoComplete: 'on',
            });
        }
        setCercleInputsData(arr);
    }, [countCercles, setCercleInputsData]);

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
                <InputLabel variant="standard" htmlFor="cercles-count">
                    Количество колец
                </InputLabel>
                <NativeSelect
                    onChange={(e) => dispatch(updateCercleCount(+e.target.value))}
                    defaultValue={4}
                    inputProps={{
                        name: 'cercles-count',
                        id: 'cercles-count',
                    }}
                >
                    <option className="options" value={1}>
                        1
                    </option>
                    <option className="options" value={2}>
                        2
                    </option>
                    <option className="options" value={3}>
                        3
                    </option>
                    <option className="options" value={4}>
                        4
                    </option>
                    <option className="options" value={5}>
                        5
                    </option>
                    <option className="options" value={6}>
                        6
                    </option>
                </NativeSelect>
            </FormControl>
            {cercleInputsData.map((item, i) => {
                return (
                    <MyTextInput
                        key={i}
                        label={item.label}
                        id={item.id}
                        name={item.name}
                        type={item.type}
                        autoComplete={item.autoComplete}
                    />
                );
            })}
        </List>
    );
};

export default CercleInputs;
