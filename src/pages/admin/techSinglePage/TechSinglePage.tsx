import { FC, useCallback, useMemo, useState } from 'react';
import DoneIcon from '@mui/icons-material/Done';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, Container, Divider, Grid, Popover, PopoverOrigin, TextField, Typography } from '@mui/material';

import LogList from '../components/logList/LogList';

const styles = {
    nameTech: { textAlign: 'left', margin: '15px 0 15px 40px' },
    headerBox: { display: 'flex' },
    headerBtn: { margin: '0 25px' },
    popover: { mt: '3px' },
    doneIcon: { padding: '12px 0', cursor: 'pointer' },
    grid: { mt: '5px' },
    aboutBox: { display: 'flex', justifyContent: 'start' },
    aboutBtn: { margin: '0 25px' },
    textField: { width: '100%' },
};

const anchorOrigin: PopoverOrigin = {
    vertical: 'top',
    horizontal: 'right',
};

const TechSinglePage: FC = () => {
    const [textAboutReadOnly, setTextAboutReadOnly] = useState<boolean>(true);
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    }, []);
    const handleClose = useCallback(() => {
        setAnchorEl(null);
    }, []);
    const onClickHandler = useCallback(() => {
        setTextAboutReadOnly(!textAboutReadOnly);
    }, [textAboutReadOnly]);

    const open = Boolean(anchorEl);

    const id = useMemo(() => (open ? 'simple-popover' : undefined), [open]);
    const editColor = useMemo(() => (textAboutReadOnly ? 'primary' : 'error'), [textAboutReadOnly]);
    const iconColor = useMemo(() => (!anchorEl ? 'primary' : 'error'), [anchorEl]);
    const clickToSaveContent = useMemo(
        () => (textAboutReadOnly ? null : <Typography sx={{ ml: '3px' }}>Нажмите для сохранения</Typography>),
        [textAboutReadOnly]
    );
    const editToggle = useMemo(() => (textAboutReadOnly ? null : 'Редактирование включено'), [textAboutReadOnly]);
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
                    Название технологии
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
                        defaultValue="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, odit, debitis totam sit
                            tempora amet quia quod sed molestiae omnis temporibus quas, harum accusamus tenetur maiores
                            modi velit dolores? Natus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, odit, debitis totam sit
                            tempora amet quia quod sed molestiae omnis temporibus quas, harum accusamus tenetur maiores
                            modi velit dolores? Natus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, odit, debitis totam sit
                            tempora amet quia quod sed molestiae omnis temporibus quas, harum accusamus tenetur maiores
                            modi velit dolores? Natus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, odit, debitis totam sit
                            tempora amet quia quod sed molestiae omnis temporibus quas, harum accusamus tenetur maiores
                            modi velit dolores? Natus.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, odit, debitis totam sit
                            tempora amet quia quod sed molestiae omnis temporibus quas, harum accusamus tenetur maiores
                            modi velit dolores? Natus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, odit, debitis totam sit
                            tempora amet quia quod sed molestiae omnis temporibus quas, harum accusamus tenetur maiores
                            modi velit dolores? Natus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, odit, debitis totam sit
                            tempora amet quia quod sed molestiae omnis temporibus quas, harum accusamus tenetur maiores
                            modi velit dolores? Natus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, odit, debitis totam sit
                            tempora amet quia quod sed molestiae omnis temporibus quas, harum accusamus tenetur maiores
                            modi velit dolores? Natus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, odit, debitis totam sit
                            tempora amet quia quod sed molestiae omnis temporibus quas, harum accusamus tenetur maiores
                            modi velit dolores? Natus.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, odit, debitis totam sit
                            tempora amet quia quod sed molestiae omnis temporibus quas, harum accusamus tenetur maiores
                            modi velit dolores? Natus."
                        InputProps={InputProps}
                        multiline
                        placeholder="Внесите информацию о технологии..."
                        maxRows={10}
                        sx={styles.textField}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <LogList boxWidth="100%" boxMaxHeight="72vh" />
                </Grid>
            </Grid>
        </Container>
    );
};

export default TechSinglePage;
