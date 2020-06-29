import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  banner: {
    height: '40vh',
    width: '100%',
    position: 'relative',
    marginBottom: theme.spacing(2),
  },
  bannerText: {
    color: 'white',
    position: 'absolute',
    top: '50%',
    left: '50%',
    textAlign: 'center',
    transform: 'translate(-50%,50%)',
    width: '100%',
  },
}));

export default function Banner({title, description, imgURL}) {
  const classes = useStyles();

  return (
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
        <Typography variant="subtitle1">{description}</Typography>
      </div>
    </div>

  );
}

Banner.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imgURL: PropTypes.string.isRequired,
};
