import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  surpriseMe: {
    padding: theme.spacing(2)*.75,
  },
}));

export default function SurpriseMeButton({numOfResults}) {
  const classes = useStyles();

  const computeRandomIndex = (numOfResults) => {
    const ranNum = Math.floor(Math.random() * numOfResults);
    const ARTWORKS_PER_PAGE = 9;
    const pageNum = Math.floor(ranNum/ARTWORKS_PER_PAGE);
    const index = ranNum % ARTWORKS_PER_PAGE;
    return {pageNum, index};
  };

  const surpriseMe = () => {
    // console.log is here to check it
    // next PR, I will use the pageNum and the index to fetch
    // the artwork's id
    console.log(computeRandomIndex(numOfResults));
  };

  return (
    <div>
      <Button
        variant="contained"
        color="secondary"
        className={classes.surpriseMe}
        onClick={surpriseMe}
      >
        Surprise me!
      </Button>
    </div>

  );
}

SurpriseMeButton.propTypes = {
  numOfResults: PropTypes.number.isRequired,
};
