import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import ImgMediaCard from './ImgMediaCard';

const useStyles = makeStyles((theme) => ({
  galleryTitle: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'flex-start',
    padding: theme.spacing(5),
  },
  viewMoreButton: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'flex-end',
    padding: theme.spacing(4),
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.text.primary,
  },
}));

export default function GalleryPreview({name, link}) {
  const classes = useStyles();

  return (
    <>
      <Container className={classes.galleryTitle}>
        <Typography variant="h4" component="h2">{name}</Typography>
      </Container>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={4}
      >
        {[0, 1, 2].map((value) => (
          <Grid key={value} item>
            <ImgMediaCard/>
          </Grid>
        ))}
      </Grid>
      <Container className={classes.viewMoreButton}>
        <Link to={link} className={classes.link}>
          <Button variant="contained">View More</Button>
        </Link>
      </Container>
    </>
  );
}

GalleryPreview.propTypes = {
  name: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};
