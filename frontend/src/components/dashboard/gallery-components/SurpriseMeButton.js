import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  surpriseMe: {
    padding: theme.spacing(2)*.75,
  },
  linkToRandom: {
    textDecoration: 'none',
  },
}));

export default function SurpriseMeButton() {
  const classes = useStyles();

  const randomArtworkId = useSelector(
      (state) => (state.museumArtworks.randomArtworkId));

  return (
    <div>
      {(randomArtworkId !== null) &&
        <Link
          to = {`/gallery/museum/${randomArtworkId}`}
          className={classes.linkToRandom}
        >
          <Button
            variant="contained"
            color="secondary"
            className={classes.surpriseMe}
          >
            Surprise me!
          </Button>
        </Link>
      }
    </div>

  );
}
