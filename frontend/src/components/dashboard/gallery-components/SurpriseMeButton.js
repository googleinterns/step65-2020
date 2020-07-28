import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import {getRandomArtworkId} from '../../../redux/museumArtworkActions';
import {useDispatch} from 'react-redux';

const useStyles = makeStyles((theme) => ({
  surpriseMe: {
    padding: theme.spacing(2)*.75,
  },
}));

export default function SurpriseMeButton({numOfResults, searchQuery, sortBy, searchField}) {
  const classes = useStyles();
  const ARTWORKS_PER_PAGE = 9;

  const computeRandomIndex = (numOfResults) => {
    const ranNum = Math.floor(Math.random() * numOfResults);
    const pageNum = Math.floor(ranNum/ARTWORKS_PER_PAGE);
    const index = ranNum % ARTWORKS_PER_PAGE;
    return {pageNum, index};
  };

  const dispatch = useDispatch();

  const surpriseMe = () => {
    // console.log is here to check it
    // next PR, I will use the pageNum and the index to fetch
    // the artwork's id
    const {pageNum, index} = computeRandomIndex(numOfResults);
    dispatch(getRandomArtworkId(
        pageNum, ARTWORKS_PER_PAGE, searchQuery, sortBy, searchField, index));
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
  searchQuery: PropTypes.string.isRequired,
  sortBy: PropTypes.string.isRequired,
  searchField: PropTypes.string.isRequired,
};
