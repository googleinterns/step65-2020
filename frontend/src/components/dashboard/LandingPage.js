import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import BackgroundImage from './images/landing-page.JPG';
import {Typography} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

const useStyles = makeStyles((theme) => ({
  banner: {
    background: 'url('+BackgroundImage+')',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    height: '100vh',
    marginBottom: theme.spacing(2),
    position: 'relative',
    width: '100%',
  },
  bannerText: {
    left: '30%',
    position: 'absolute',
    top: '40%',
    transform: 'translate(-50%,-50%)',
    width: '100%',
    textAlign: 'center',
  },
}));

export default function Banner() {
  const classes = useStyles();

  return (
    <Grid
      direction="column"
      justify="flex-start"
      alignItems="center"
      spacing={4}
      className={classes.banner}
    >
      <Grid item xs={3} className={classes.bannerText}>
        <Typography
          variant="h1"
          color="primary"
        >
          Luminart
        </Typography>
        <Typography variant="h4" color="textPrimary" gutterBottom>
          Shining a light on a new way to experience art for everyone.
        </Typography>
        <br/>
        <Button variant="contained" color="secondary">
          Learn More
          <ArrowDownIcon/>
        </Button>
      </Grid>
    </Grid>
  );
};
