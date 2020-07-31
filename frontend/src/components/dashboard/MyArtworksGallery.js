import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {makeStyles} from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import Container from '@material-ui/core/Container';
import MyArtsGallery from './gallery-components/MyArtsGallery';
import LinearProgress from '@material-ui/core/LinearProgress';
import {fetchMyArtworks} from '../../redux/myArtworksActions';

const useStyles = makeStyles((theme) => ({
  loading: {
    flexGrow: 1,
    flexDirection: 'row',
  },
  gallery: {
    marginTop: theme.spacing(2),
  },
}));

export default function MyArtworksGallery() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const artworksLoading = useSelector(
      (state) => (state.myArtworks.loading));
  const artworksError = useSelector(
      (state) => (state.myArtworks.error));
  const auth = useSelector(
      (state) => state.firebase.auth);

  useEffect(() => {
    dispatch(fetchMyArtworks(auth.uid));
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
        <MyArtsGallery />
      </Container>
    </>
  );
}
