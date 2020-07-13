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
import PlaceholderImage from './images/paint.jpg';
import {useDispatch, useSelector} from 'react-redux';
import {fetchMuseumArtworks} from "../../redux/museumArtworkActions";

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
  const id = props.match.params.id;
  const artworks = useSelector((state) => (state.museumArtworks.artworks));
  console.log(artworks);
  const dispatch = useDispatch();
  const artwork = artworks.get(id);
  console.log(artwork);
  const altText = artwork.get('alt');
  const title = artwork.get('title');
  const description = artwork.get('description');
  const url = artwork.get('url');
  // const description = 'Lorem ipsum dolor sit amet, consectetur ' +
  //     'adipiscing elit. Praesent ultrices, lectus ut pharetra ' +
  //     'interdum, nibh purus venenatis lectus, id lobortis ' +
  //     'libero mauris id diam. Donec consequat rutrum felis, ' +
  //     'vestibulum luctus tortor vulputate vel. Etiam eleifend ' +
  //     'vulputate neque cursus laoreet. Suspendisse lacus ' +
  //     'enim, vehicula quis ullamcorper vitae, egestas ' +
  //     'molestie nulla. Suspendisse egestas arcu sed ' +
  //     'efficitur rhoncus. Suspendisse elementum risus ' +
  //     'dolor, sit amet pellentesque magna ornare quis. ' +
  //     'Phasellus non libero augue. Ut rhoncus, felis ' +
  //     'laoreet tincidunt ultrices, ipsum dui ' +
  //     'consequat tellus, et venenatis risus quam ' +
  //     'nec massa.';

  const ttsLink = `https://storage.cloud.google.com/tts-audio/${id}`;

  useEffect(() => {
    dispatch(fetchMuseumArtworks());
    const params = new URLSearchParams();
    params.append('text', description);
    params.append('id', id);
    fetch('/api/v1/tts', {method: 'POST', body: params})
        .then(() => document.getElementById('audio')
            .setAttribute('src', ttsLink));
  }, [dispatch, description, id, ttsLink]);

  return (
    <Container className={classes.withPadding}>
      <Card className={classes.root}>
        <CardHeader
          title={title}
          subheader="Artist Name"
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
              image={url}
              title={title}
            />
            <CardContent className={classes.content}>
              <Typography
                variant="body2"
                color="textSecondary"
                align="center"
                component="p"
              >
                {altText}
              </Typography>
              <AudioPlayer controls id='audio' className={classes.audioPlayer}/>
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
              <Typography paragraph>
                {description}
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
