import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Gallery from './Gallery';

const PREVIEW_SIZE = 3;

const useStyles = makeStyles((theme) => ({
  galleryTitle: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'flex-start',
    padding: theme.spacing(3),
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
  alert: {
    marginBottom: theme.spacing(3),
  },
}));

export default function GalleryPreview({name, link, isMuseum, artworksError}) {
  const classes = useStyles();

  return (
    <>
      <Container className={classes.galleryTitle}>
        <Typography variant="h4" component="h2">{name}</Typography>
      </Container>
      {artworksError && (
        <Alert
          severity="error"
          className={classes.alert}
        >
            The images could not be loaded at this time.
        </Alert>
      )}
      <Gallery size={PREVIEW_SIZE} isMuseum={isMuseum}/>
      <Container className={classes.viewMoreButton}>
        <Link to={link} className={classes.link}>
          <Button variant="contained" color="primary">View More</Button>
        </Link>
      </Container>
    </>
  );
}

GalleryPreview.propTypes = {
  name: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  isMuseum: PropTypes.bool.isRequired,
  artworksError: PropTypes.bool.isRequired,
};
