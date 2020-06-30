import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  banner: {
    height: '40vh',
    marginBottom: theme.spacing(2),
    position: 'relative',
    width: '100%',
  },
  bannerText: {
    color: 'white',
    left: '50%',
    position: 'absolute',
    textAlign: 'center',
    top: '50%',
    transform: 'translate(-50%,-50%)',
    width: '100%',
  },
}));

export default function Banner({title, description, imgURL}) {
  const classes = useStyles();

  return(
    <div
      className={classes.banner}
      style={{
        background:
          'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), ' +
          'url('+imgURL+')',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      <div className={classes.bannerText}>
        <Typography variant="h2" component="h1" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h5" component="h2">{description}</Typography>
      </div>
    </div>

  );
}

Banner.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imgURL: PropTypes.string.isRequired,
};
