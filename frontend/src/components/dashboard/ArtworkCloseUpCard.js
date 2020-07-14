import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import AudioPlayer from 'react-audio-player';
import Container from '@material-ui/core/Container';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';

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
}));

export default function ArtworkCloseUpCard(props) {
  const classes = useStyles();

  const subheaderTypographyProps = {color: 'textSecondary'};

  const id = props.match.params.id;
  const artworks = useSelector((state) => (state.museumArtworks.artworks));
  const artwork = artworks.get(id);

  useEffect(() => {
    const description = artwork.get('description');
    document.getElementById('description').innerHTML = description;

    const params = new URLSearchParams();
    params.append('text', description);
    params.append('id', id);
    fetch('/api/v1/tts', {method: 'POST', body: params})
        .then((response) => response.text())
        .then((ttsLink) => document.getElementById('audio')
            .setAttribute('src', ttsLink));
  }, [artwork, id]);

  return (
    <Container className={classes.withPadding}>
      <Card className={classes.root}>
        <CardHeader
          title={artwork.get('title')}
          subheader={artwork.get('artist')}
          subheaderTypographyProps={subheaderTypographyProps}
          className={classes.header}
        />
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="flex-start"
          spacing={4}
          className={classes.root}
        >
          <Grid item xs={12} md={8}>
            <CardMedia
              className={classes.media}
              image={artwork.get('url')}
              title={artwork.get('title')}
            />
            <CardContent className={classes.content}>
              <Typography
                variant="body2"
                color="textSecondary"
                align="center"
                component="p"
              >
                {artwork.get('alt')}
              </Typography>
              <AudioPlayer controls id="audio" className={classes.audioPlayer}/>
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
              <Typography id="description" paragraph>
              </Typography>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
}

ArtworkCloseUpCard.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
