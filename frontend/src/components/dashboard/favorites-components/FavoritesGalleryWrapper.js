import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {makeStyles} from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import Container from '@material-ui/core/Container';
import LinearProgress from '@material-ui/core/LinearProgress';
import {
  fetchFavorites,
  getFavoritesCount,
} from '../../../redux/favorites/favoritesActions';
import FavoritesGallery from './FavoritesGallery';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(2),
  },
  loading: {
    flexDirection: 'row',
    flexGrow: 1,
  },
  gallery: {
    marginTop: theme.spacing(2),
  },
}));

export default function FavoritesGalleryWrapper() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const LIMIT = 9;

  const [favoritesPageNum, setFavoritesPageNum] = useState(1);
  const [pageNums, setPageNums] = useState(1);

  const artworksLoading = useSelector((state) => state.favorites.loading);
  const artworksError = useSelector((state) => state.favorites.error);
  const auth = useSelector((state) => state.firebase.auth);
  const count = useSelector((state) => state.favorites.count);


  const handleChangePage = (event, value) => {
    setFavoritesPageNum(value);
  };

  useEffect(() => {
    dispatch(getFavoritesCount(auth.uid));
    dispatch(fetchFavorites(auth.uid, favoritesPageNum));
    setPageNums(Math.max(Math.ceil(count / LIMIT), 1));
  }, [dispatch, auth.uid, count, favoritesPageNum]);


  return (
    <>
      {artworksLoading && (
        <div className={classes.root}>
          <LinearProgress />
        </div>
      )}
      {artworksError && (
        <Alert
          severity="error"
        >
              The images could not be loaded at this time.
        </Alert>
      )}
      <Container className={classes.gallery}>
        <FavoritesGallery/>
      </Container>
      {!artworksLoading && !artworksError && (
        <Container className={classes.pagination}>
          <Pagination
            count={pageNums}
            size="large"
            page={favoritesPageNum}
            onChange={handleChangePage}
          />
        </Container>
      )}
    </>
  );
}
