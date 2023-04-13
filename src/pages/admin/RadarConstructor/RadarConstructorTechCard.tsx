import { FC } from 'react';
import { Box, FormControl, InputLabel, NativeSelect, TextField } from '@mui/material';

const RadarConstructorTechCard: FC = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                marginTop: '10px',
                borderRadius: '5px',
                padding: '10px 10px',
                border: '1px solid',
                borderColor: 'rgba(0, 0, 0, 0.23)',
                height: '200px',
            }}
        >
            <TextField
                label="Название технологии"
                id="standard-size-small"
                defaultValue=""
                size="small"
                variant="standard"
            />
            <FormControl fullWidth>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                    Квадрант
                </InputLabel>
                <NativeSelect
                    defaultValue={30}
                    inputProps={{
                        name: 'age',
                        id: 'uncontrolled-native',
                    }}
                >
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                </NativeSelect>
            </FormControl>
            <FormControl fullWidth>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                    Сектор
                </InputLabel>
                <NativeSelect
                    defaultValue={30}
                    inputProps={{
                        name: 'age',
                        id: 'uncontrolled-native',
                    }}
                >
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                </NativeSelect>
            </FormControl>
            <TextField label="Комментарий" id="standard-size-small" defaultValue="" size="small" variant="standard" />
        </Box>
    );
};

export default RadarConstructorTechCard;
