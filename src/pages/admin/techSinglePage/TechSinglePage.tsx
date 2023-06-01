import { FC, useCallback, useMemo, useState, MouseEvent } from 'react';
import DoneIcon from '@mui/icons-material/Done';
import EditIcon from '@mui/icons-material/Edit';
import {
    Box,
    Button,
    Container,
    Divider,
    Grid,
    Popover,
    PopoverOrigin,
    SxProps,
    TextField,
    Typography,
} from '@mui/material';

import { useGetBlipQuery } from '../../../api/blipsSinglePageApi';
import { IndexBlipEventApi } from '../../../api/types';
import LogList from '../components/logList/LogList';

export const mock: IndexBlipEventApi[] = [
    {
        id: 100500,
        comment:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque elementum neque et augue pharetra, id posuere diam fringilla. Mauris pharetra consectetur lobortis.',
        parentId: 1,
        blip: {
            id: 700,
            name: 'Java',
            description: 'Hello world',
            radarId: 1,
        },
        quadrant: {
            id: 1,
            name: 'Tools',
            position: 1,
        },
        ring: {
            id: 1,
            name: 'Active',
            position: 1,
        },
        author: {
            id: 1,
            username: 'John Doe',
        },
        creationTime: '2023-05-30T12:09:41.606821Z',
        lastChangeTime: '2023-05-30T12:09:41.606821Z',
    },
];

const styles: Record<string, SxProps> = {
    nameTech: { textAlign: 'left', margin: '15px 0 15px 40px' },
    headerBox: { display: 'flex' },
    headerBtn: { margin: '0 25px' },
    popover: { mt: '3px' },
    doneIcon: { padding: '12px 0', cursor: 'pointer' },
    grid: { mt: '5px' },
    aboutBox: { display: 'flex', justifyContent: 'start' },
    aboutBtn: { margin: '0 25px' },
    textField: { width: '100%' },
    clickToSave: { ml: '3px' },
};

const anchorOrigin: PopoverOrigin = {
    vertical: 'top',
    horizontal: 'right',
};

const TechSinglePage: FC = () => {
    const [textAboutReadOnly, setTextAboutReadOnly] = useState<boolean>(true);
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const {
        data,
        // , error, isLoading
    } = useGetBlipQuery(1);

    const nameTech = data ? data.name : 'имя не указано';
    const descrTech = data ? data.description : 'описание не указано';

    const handleClick = useCallback((event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    }, []);
    const handleClose = useCallback(() => {
        setAnchorEl(null);
    }, []);
    const onClickHandler = useCallback(() => {
        setTextAboutReadOnly(!textAboutReadOnly);
    }, [textAboutReadOnly]);

    const open = Boolean(anchorEl);

    const id = open ? 'simple-popover' : undefined;
    const editColor = textAboutReadOnly ? 'primary' : 'error';
    const iconColor = !anchorEl ? 'primary' : 'error';
    const clickToSaveContent = textAboutReadOnly ? null : (
        <Typography sx={styles.clickToSave}>Нажмите для сохранения</Typography>
    );
    const editToggle = textAboutReadOnly ? null : 'Редактирование включено';
    const InputProps = useMemo(
        () => ({
            readOnly: textAboutReadOnly,
        }),
        [textAboutReadOnly]
    );

    return (
        <Container maxWidth="xl">
            <Box sx={styles.headerBox}>
                <Typography variant="h5" sx={styles.nameTech}>
                    {nameTech}
                </Typography>
                <Button variant="text" sx={styles.headerBtn} aria-describedby={id} onClick={handleClick}>
                    <EditIcon id="editTextAboutTech" color={iconColor} />
                </Button>
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={anchorOrigin}
                    sx={styles.popover}
                >
                    <TextField placeholder="Введите новое название" variant="outlined" />
                    <DoneIcon sx={styles.doneIcon} />
                </Popover>
            </Box>
            <Divider />
            <Grid container spacing={2} sx={styles.grid}>
                <Grid item xs={12} md={6}>
                    <Box sx={styles.aboutBox}>
                        <Typography variant="h5">О технологии</Typography>
                        <Button variant="text" sx={styles.aboutBtn} onClick={onClickHandler}>
                            <EditIcon color={editColor} />
                            {clickToSaveContent}
                        </Button>
                    </Box>

                    <TextField
                        id="outlined-read-only-input"
                        label={editToggle}
                        defaultValue={descrTech}
                        InputProps={InputProps}
                        multiline
                        placeholder="Внесите информацию о технологии..."
                        maxRows={10}
                        sx={styles.textField}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <LogList boxWidth="100%" boxMaxHeight="72vh" blipEvents={mock} />
                </Grid>
            </Grid>
        </Container>
    );
};

export default TechSinglePage;
