import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import {fetchMuseumArtworks, getRandomArtworkId} from '../../../redux/museumArtworkActions';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  surpriseMe: {
    padding: theme.spacing(2)*.75,
  },
  linkToRandom: {
    textDecoration: 'none',
  },
}));

export default function SurpriseMeButton(
    {numOfResults, searchQuery, sortBy, searchField}) {
  const classes = useStyles();
  const ARTWORKS_PER_PAGE = 9;

  const [newRandomArtwork, setNewRandomArtwork] = React.useState(false);

  const computeRandomIndex = (numOfResults) => {
    const ranNum = Math.floor(Math.random() * numOfResults);
    const pageNum = Math.floor(ranNum/ARTWORKS_PER_PAGE);
    const index = ranNum % ARTWORKS_PER_PAGE;
    return {pageNum, index};
  };

  const dispatch = useDispatch();
  const randomArtworkId = useSelector(
      (state) => (state.museumArtworks.randomArtworkId));
  useEffect(() => {
    const {pageNum, index} = computeRandomIndex(numOfResults);
    dispatch(getRandomArtworkId(
        pageNum, ARTWORKS_PER_PAGE, searchQuery, sortBy, searchField, index))
        .then(setNewRandomArtwork(false));
  },
  [dispatch, searchQuery, sortBy, searchField, numOfResults, newRandomArtwork]);

  const LIMIT = 9;
  const FIRST_PAGE = 1;
  const EMPTY_QUERY = '';
  useEffect(() => {
    if (newRandomArtwork) {
      dispatch(fetchMuseumArtworks(FIRST_PAGE, LIMIT, EMPTY_QUERY));
    }
  }, [dispatch, newRandomArtwork]);

  const surpriseMe = () => {
    setNewRandomArtwork(true);
  };


  return (
    <Link
      to = {`/gallery/museum/${randomArtworkId}`}
      className={classes.linkToRandom}
    >
      <Button
        variant="contained"
        color="secondary"
        className={classes.surpriseMe}
        onClick={surpriseMe}
        // to= {`/gallery/museum/${randomArtworkId}`}
      >
        Surprise me!
      </Button>
    </Link>

  );
}

SurpriseMeButton.propTypes = {
  numOfResults: PropTypes.number.isRequired,
  searchQuery: PropTypes.string.isRequired,
  sortBy: PropTypes.string.isRequired,
  searchField: PropTypes.string.isRequired,
};
