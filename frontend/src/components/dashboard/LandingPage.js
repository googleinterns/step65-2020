import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import BackgroundImage from './images/landing-page.JPG';

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
}));

export default function Banner() {
  const classes = useStyles();

  return (
    <div
      className={classes.banner}
    >
    </div>
  );
};
