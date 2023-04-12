import { FC } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import ShareIcon from '@mui/icons-material/Share';
import {
    Typography,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Checkbox,
    FormControlLabel,
    IconButton,
    Switch,
} from '@mui/material';

const RadarItem: FC = () => {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader
                action={
                    <IconButton aria-label="settings">
                        <EditIcon />
                    </IconButton>
                }
                title="Lorem ipsum dolor"
                subheader="April 08, 2023"
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut in nemo rerum exercitationem voluptatem
                    modi esse...
                </Typography>
            </CardContent>
            <CardActions disableSpacing style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <FormControlLabel
                    style={{ marginLeft: 0 }}
                    control={<Switch size="small" defaultChecked />}
                    label="Публичный"
                />
                <div>
                    <IconButton aria-label="share">
                        <ShareIcon />
                    </IconButton>
                    <FormControlLabel control={<Checkbox defaultChecked={false} />} label="Доступ по ссылке" />
                </div>
            </CardActions>
        </Card>
    );
};

export default RadarItem;
