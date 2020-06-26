import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    banner: {
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        height: '50%',
        position: 'relative',
    },
    bannerText: {
        textAlign: 'center',
    },
}));

export default function Banner({title, description, imgURL}) {
    const classes = useStyles();

    return (
        <div className={classes.banner} style={{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${imgURL})'}}>
            <div className={classes.bannerText}>
                <Typography variant="h2" component="h1" gutterBottom>{title}</Typography>
                <Typography variant="subtitle1">{description}</Typography>
            </div>

        </div>

    );
}
