import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Link} from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CardMenuBttn from '../CardMenuBttn';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) =>({
  root: {
    maxWidth: 345,
    textAlign: 'right',
  },
  link: {
    color: theme.palette.text.primary,
    textDecoration: 'none',
  },
  name: {
    paddingBottom: 0,
    textAlign: 'left',
  },
  truncate: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  button: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));

export default function MyArtImgMediaCard({name, link, alt, url, id}) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <Link to={link} className={classes.link}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt={alt}
            height="300"
            image={url}
            title={name}
          />
          <CardContent className={classes.name}>
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              className={classes.truncate}
            >
              {name}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
      <CardMenuBttn
        className={classes.button}
        id={id}
      />
    </Card>
  );
}

MyArtImgMediaCard.propTypes = {
  name: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
