import { FC } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import ShareIcon from '@mui/icons-material/Share';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

const TechItem: FC = () => {
    return (
        <Box sx={{ minWidth: 275 }}>
            <Card variant="outlined">
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
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut in nemo rerum exercitationem
                        voluptatem modi esse...
                    </Typography>
                </CardContent>
                <CardActions sx={{ backgroundColor: '#363030', justifyContent: 'space-between' }}>
                    <Button size="small" sx={{ color: 'white' }}>
                        <LocalLibraryIcon sx={{ pr: '5px' }} />
                        <Typography>УЗНАТЬ БОЛЬШЕ</Typography>
                    </Button>
                    <IconButton aria-label="share">
                        <ShareIcon sx={{ color: 'white' }} />
                    </IconButton>
                </CardActions>
            </Card>
        </Box>
    );
};

export default TechItem;
