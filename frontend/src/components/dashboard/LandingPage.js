import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import BackgroundImage from './images/landing-page.JPG';
import MobileBackgroundImage from './images/mobile-landing-page.JPG';
import {Typography} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import {Link as ScrollLink} from 'react-scroll';

const useStyles = makeStyles((theme) => ({
  banner: {
    [theme.breakpoints.down('sm')]: {
      background: 'url(' + MobileBackgroundImage + ')',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      height: '90vh',
      margin: '0',
      position: 'relative',
      width: '100%',
    },
    [theme.breakpoints.up('md')]: {
      background: 'url(' + BackgroundImage + ')',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      height: '100vh',
      margin: '0',
      position: 'relative',
      width: '100%',
    },
  },
  bannerText: {
    [theme.breakpoints.down('sm')]: {
      left: '50%',
      position: 'absolute',
      textAlign: 'center',
      top: '70%',
      transform: 'translate(-50%,-50%)',
      width: '100%',
    },
    [theme.breakpoints.up('md')]: {
      left: '30%',
      position: 'absolute',
      textAlign: 'center',
      top: '40%',
      transform: 'translate(-50%,-50%)',
      width: '100%',
    },
  },
}));

export default function LandingPage() {
  const classes = useStyles();

  return (
    <Grid
      container
      direction="column"
      justify="flex-start"
      alignItems="center"
      spacing={3}
      className={classes.banner}
    >
      <Grid item xs={10} md={6} lg={4} className={classes.bannerText}>
        <Typography
          variant="h1"
          color="primary"
        >
          Luminart
        </Typography>
        <Typography
          variant="h4"
          component="h2"
          color="textPrimary"
          gutterBottom
        >
          Shining a light on a new way to experience art for everyone.
        </Typography>
        <br/>
        <ScrollLink
          activeClass="active"
          to="OurMission"
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
        >
          <Button variant="contained" color="secondary">
            Learn More
            <ArrowDownIcon/>
          </Button>
        </ScrollLink>
      </Grid>
    </Grid>
  );
};
