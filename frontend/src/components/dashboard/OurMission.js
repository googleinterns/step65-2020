import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(10),
  },
}));

export default function OurMission() {
  const classes = useStyles();
  return (
    <Container className={classes.container}>
      <Grid container alignItems="center">
        <Grid item xs={12} md={4}>
          <Typography color="primary" variant="h2" alignCenter>
            Our Mission
          </Typography>
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant="body1">
            With the goal of making art universally accessible,
            especially to those that are visually-impaired,
            we created a website that provides a virtual
            art experience.  This website allows artists
            and art-lovers of all abilities to both enjoy art
            and share their own artwork.  The website is
            screen-reader compatible and keyboard navigable.
            Every piece of art displayed on the website has
            a corresponding description that expands beyond
            a one line ALT text, and this description will
            be read aloud when an artwork is selected.
            While much of the artwork
            displayed on the website is drawn from an
            art museum’s public API, we also want to provide a
            platform for any artist to share their art.
            Thus, we include an accessible form for
            users to upload and write descriptions of
            their own artwork.
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
}
