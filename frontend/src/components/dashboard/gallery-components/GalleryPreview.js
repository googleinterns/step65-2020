import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
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

export default function GalleryPreview({name, link, isMuseum}) {
  const classes = useStyles();

  return (
    <>
      <Container className={classes.galleryTitle}>
        <Typography variant="h4" component="h2">{name}</Typography>
      </Container>
      <Gallery size={PREVIEW_SIZE} isMuseum={isMuseum} isPreview={true}/>
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
};
