import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import AudioPlayer from 'react-audio-player';
import PlaceholderImage from './images/paint.jpg';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    flexDirection: 'row',
  },
  header: {
    background: theme.palette.secondary.light,
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
}));

export default function ArtworkCloseUpCard() {
  const classes = useStyles();
  const description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,\n' +
      '              sed do eiusmod tempor incididunt ut labore et dolore\n' +
      '              magna aliqua. Consectetur lorem donec massa sapien.\n' +
      '              Purus faucibus ornare suspendisse sed. Id neque aliquam\n' +
      '              vestibulum morbi blandit cursus risus. Amet dictum sit amet\n' +
      '              justo donec enim diam vulputate. Velit dignissim sodales ut\n' +
      '              eu sem integer vitae. Quisque egestas diam in arcu cursus.\n' +
      '              Non diam phasellus vestibulum lorem. Proin fermentum leo vel\n' +
      '              orci. Purus semper eget duis at tellus at. Id aliquet risus\n' +
      '              feugiat in.';

  return (
    <Card className={classes.root}>
      <CardHeader
        title="Artwork Name"
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
            image={PlaceholderImage}
            title="Artwork"
          />
          <CardContent className={classes.content}>
            <Typography
              variant="body2"
              color="textSecondary"
              align="center"
              component="p"
            >
              This a is short physical description of the artwork.
            </Typography>
            <AudioPlayer controls className={classes.audioPlayer}/>
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
  );
}
