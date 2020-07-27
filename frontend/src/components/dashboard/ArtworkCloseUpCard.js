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
import {useSelector} from 'react-redux';
import {generateTextToSpeech, getMuseumAudioTranscript,
  getUserAudioTranscript} from './textToSpeechHelpers';
import IconButton from '@material-ui/core/IconButton';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Box from '@material-ui/core/Box';
import {isLoaded, isEmpty} from 'react-redux-firebase';

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
  },
  audioPlayer: {
    margin: theme.spacing(1),
  },
  withPadding: {
    padding: theme.spacing(3),
  },
  box: {
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

  const subheaderTypographyProps = {color: 'light'};

  const id = props.match.params.id;

  const isMuseum = props.match.params.collection === 'museum';

  const auth = useSelector((state) => state.firebase.auth);

  const artworks = useSelector((state) => (isMuseum ?
      state.museumArtworks.artworks :
      state.userArtworks.artworks));

  const handleAddToFavorites = () => {
    setIsFavorite(true);
  };

  useEffect(() => {
    if (artworks && artworks.has(id)) {
      const artwork = artworks.get(id);
      const description = artwork.get('description');
      const descriptionElement = document.getElementById('description');
      descriptionElement.innerHTML = description;

      function handleErrors(response) {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      }

      generateTextToSpeech(isMuseum ?
          getMuseumAudioTranscript(artwork) :
          getUserAudioTranscript(artwork), id)
          .then(handleErrors)
          .then((response) => response.text())
          .then((blobKey) => {
            document.getElementById('audio')
                .setAttribute('src', `/api/v1/get-blob?blob-key=${blobKey}`);
          })
          .then(() => setAudioLoading(false))
          .catch(() => {
            setError(true);
            setAudioLoading(false);
          });
    }
  }, [artworks, id, isMuseum]);

  if (!artworks || !artworks.has(id)) {
    return (
      <div className={classes.root}>
        <LinearProgress color="secondary" />
      </div>
    );
  } else {
    const artwork = artworks.get(id);
    const title = artwork.get('title');
    const artist = artwork.get('artist');
    const alt = artwork.get('alt');
    const date = artwork.get('date');

    return (
      <Container className={classes.withPadding}>
        <Card className={classes.root}>
          <CardHeader
            title={title}
            subheader={artist}
            subheaderTypographyProps={subheaderTypographyProps}
            className={classes.header}
            action={
              <Box className={classes.box}>
                <AudioPlayer
                  controls
                  id="audio"
                  className={classes.audioPlayer}
                />
                {isLoaded(auth) && !isEmpty(auth) && (<IconButton
                  aria-label="add to favorites"
                  onClick={handleAddToFavorites}
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
                image={artwork.get('url')}
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
              <CardContent className={classes.content}>
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
