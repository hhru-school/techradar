import { FC, useState, SetStateAction, useEffect } from 'react';
import { FormControl, InputLabel, List, NativeSelect, Typography } from '@mui/material';

import { updateSectorCount } from '../../../../store/dataSlice';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { MyTextInput, InputProps } from '../RadarConstructor';

const SectorInputs: FC = () => {
    const dispatch = useAppDispatch();
    const countSectors = useAppSelector((state) => state.data.countSectorInputs);
    const [sectorsInputsData, setSectorsInputsData] = useState<Array<InputProps>>([
        {
            label: `Сектор`,
            id: `name-sector`,
            name: `name-sector`,
            type: 'text',
            autoComplete: 'on',
        },
    ]);

    useEffect(() => {
        const arr: SetStateAction<InputProps[]> = [];
        for (let i = 0; i < countSectors; i++) {
            arr.push({
                label: `Сектор ${i + 1}`,
                id: `name-sector-${i + 1}`,
                name: `nameSector${i + 1}`,
                type: 'text',
                autoComplete: 'on',
            });
        }
        setSectorsInputsData(arr);
    }, [countSectors, setSectorsInputsData]);

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
                <InputLabel variant="standard" htmlFor="cercles-count">
                    Количество
                </InputLabel>
                <NativeSelect
                    onChange={(e) => dispatch(updateSectorCount(+e.target.value))}
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
            {sectorsInputsData.map((item, i) => {
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

export default SectorInputs;
