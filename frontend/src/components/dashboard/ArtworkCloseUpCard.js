import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';
import AudioPlayer from 'react-audio-player';
import Container from '@material-ui/core/Container';
import LinearProgress from '@material-ui/core/LinearProgress';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {generateTextToSpeech, getMuseumAudioTranscript,
  getUserAudioTranscript} from './textToSpeechHelpers';
import IconButton from '@material-ui/core/IconButton';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Box from '@material-ui/core/Box';
import {isLoaded, isEmpty} from 'react-redux-firebase';
import {
  addAndUpdateFavorites,
  deleteAndUpdateFavorites,
  findFavorite,
  setCurrentFavorite,
} from '../../redux/favorites/favoritesActions';
import {fetchSingleMuseumArtwork,
  setCurrentMuseumArtwork} from '../../redux/museumArtworkActions';
import {fetchSingleUserArtwork,
  setCurrentUserArtwork} from '../../redux/userArtworkActions';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    flexDirection: 'row',
  },
  header: {
    background: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
  },
  content: {
    textAlign: 'center',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
    margin: theme.spacing(3),
    backgroundSize: 'contain',
  },
  audioPlayer: {
    margin: theme.spacing(1),
  },
  withPadding: {
    padding: theme.spacing(3),
  },
  headerActionBox: {
    display: 'flex',
    textColor: theme.palette.secondary.contrastText,
  },
  favorite: {
    color: theme.palette.secondary.contrastText,
  },
}));

export default function ArtworkCloseUpCard(props) {
  const classes = useStyles();
  const [error, setError] = useState(false);
  const [audioLoading, setAudioLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentArtworkUpdated, setCurrentArtworkUpdated] = useState(false);
  const [currentFavoriteUpdated, setCurrentFavoriteUpdated] = useState(false);
  const dispatch = useDispatch();

  const subheaderTypographyProps = {color: 'light'};

  const id = props.match.params.id;

  const collection = props.match.params.collection;
  const isMuseum = collection === 'museum';

  const auth = useSelector((state) => state.firebase.auth);

  const artworks = useSelector((state) => (isMuseum ?
      state.museumArtworks.artworks :
      state.userArtworks.artworks));
  const currentArtwork =
      useSelector((state) => (isMuseum ?
          state.museumArtworks.currentArtwork :
          state.userArtworks.currentArtwork));
  const loading = useSelector((state) => (isMuseum ?
      state.museumArtworks.loading :
      state.userArtworks.loading));

  const favorites = useSelector((state) => state.favorites.artworks);
  const currentFavorite =
      useSelector((state) => state.favorites.currentFavorite);

  const handleToggleFavorite = () => {
    isFavorite ? handleDeleteFavorite() : handleAddToFavorites();
  };

  const handleAddToFavorites = () => {
    setIsFavorite(true);
    dispatch(addAndUpdateFavorites(auth.uid, collection, id,
        currentArtwork.get('title'), currentArtwork.get('alt'),
        currentArtwork.get('url')));
    setCurrentFavoriteUpdated(false);
  };

  const handleDeleteFavorite = () => {
    setIsFavorite(false);
    dispatch(deleteAndUpdateFavorites(auth.uid, currentFavorite.id));
    dispatch(setCurrentFavorite(null));
  };

  useEffect(() => {
    if (currentFavoriteUpdated && currentFavorite) {
      setIsFavorite(true);
    } else if (!currentFavoriteUpdated) {
      setIsFavorite(false);
      const favorite = favorites.find((favorite) =>
        favorite.artworkId === id && favorite.collection === collection);
      if (favorite) {
        dispatch(setCurrentFavorite(favorite));
      } else {
        dispatch(findFavorite(auth.uid, id, collection));
      }
      setCurrentFavoriteUpdated(true);
    }

    if (!loading && artworks && !currentArtworkUpdated) {
      if (artworks.has(id)) {
        isMuseum ? dispatch(setCurrentMuseumArtwork(id)) :
            dispatch(setCurrentUserArtwork(id));
      } else {
        isMuseum ? dispatch(fetchSingleMuseumArtwork(id)) :
            dispatch(fetchSingleUserArtwork(id));
      }
      setCurrentArtworkUpdated(true);
    }

    const audioElement = document.getElementById('audio');
    if (!loading && currentArtwork && currentArtworkUpdated && audioElement) {
      const description = currentArtwork.get('description');
      const descriptionElement = document.getElementById('description');
      descriptionElement.innerHTML = description;

      function handleErrors(response) {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      }

      generateTextToSpeech(isMuseum ?
          getMuseumAudioTranscript(currentArtwork) :
          getUserAudioTranscript(currentArtwork), id)
          .then(handleErrors)
          .then((response) => response.text())
          .then((blobKey) => {
            audioElement
                .setAttribute('src', `/api/v1/get-blob?blob-key=${blobKey}`);
          })
          .then(() => {
            setAudioLoading(false);
            setError(false);
          })
          .catch((error) => {
            setError(true)
            setAudioLoading(false);
          });
    }
  }, [artworks, dispatch, id, isMuseum,
    favorites, collection, currentArtwork,
    loading, currentArtworkUpdated, currentFavorite, auth.uid,
    currentFavoriteUpdated]);

  if (loading || !currentArtwork) {
    return (
      <div className={classes.root}>
        <LinearProgress color="secondary" />
      </div>
    );
  } else {
    const title = currentArtwork.get('title');
    const artist = currentArtwork.get('artist');
    const alt = currentArtwork.get('alt');
    const date = currentArtwork.get('date');

    return (
      <Container className={classes.withPadding}>
        <Card className={classes.root}>
          <CardHeader
            tabIndex={0}
            title={title}
            subheader={artist}
            subheaderTypographyProps={subheaderTypographyProps}
            className={classes.header}
            action={
              <Box className={classes.headerActionBox}>
                <AudioPlayer
                  controls
                  id="audio"
                  className={classes.audioPlayer}
                />
                {isLoaded(auth) && !isEmpty(auth) && (<IconButton
                  id="favorite-button"
                  aria-label={isFavorite ?
                      'remove from favorites' : 'add to favorites'}
                  onClick={handleToggleFavorite}
                  className={classes.favorite}
                >
                  {isFavorite ?
                      <FavoriteIcon fontSize="large"/> :
                      <FavoriteBorderIcon fontSize="large"/>}
                </IconButton>)}
              </Box>
            }
          />
          {audioLoading && (
            <div className={classes.root}>
              <LinearProgress />
            </div>
          )}
          {error && (
            <Alert
              severity="error"
            >
                  The audio could not be loaded at this time.
            </Alert>
          )}
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            spacing={4}
            className={classes.root}
          >
            <Grid item xs={12} md={8}>
              <CardMedia
                className={classes.media}
                image={currentArtwork.get('url')}
                title={artist}
              />
              <CardContent>
                {isMuseum && (
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    align="center"
                    component="p"
                  >
                    {`${artist}. ${title}, ${date}. 
                    The Art Institute of Chicago.`}
                  </Typography>
                )}
                <Typography
                  tabIndex={0}
                  variant="body2"
                  color="primary"
                  align="center"
                  component="p"
                >
                  {alt}
                </Typography>
              </CardContent>
            </Grid>
            <Grid item xs={12} md={4}>
              <CardContent className={classes.content} tabIndex={0}>
                <Typography
                  variant="h4"
                  color="primary"
                  component="h2"
                  align="center"
                  gutterBottom
                >
                    Description</Typography>
                <Typography id="description" align="left" paragraph>
                </Typography>
              </CardContent>
            </Grid>
          </Grid>
        </Card>
      </Container>
    );
  }
}

ArtworkCloseUpCard.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
      collection: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
