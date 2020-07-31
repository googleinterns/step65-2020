import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {makeStyles} from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import Container from '@material-ui/core/Container';
import LinearProgress from '@material-ui/core/LinearProgress';
import {fetchFavorites} from '../../../redux/favorites/favoritesActions';
import FavoritesGallery from './FavoritesGallery';

const useStyles = makeStyles((theme) => ({
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

  const artworksLoading = useSelector(
      (state) => (state.favorites.loading));
  const artworksError = useSelector(
      (state) => (state.favorites.error));
  const auth = useSelector(
      (state) => state.firebase.auth);

  useEffect(() => {
    dispatch(fetchFavorites(auth.uid));
  }, [dispatch, auth.uid]);

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
      <Container>
        <FavoritesGallery/>
      </Container>
    </>
  );
}
