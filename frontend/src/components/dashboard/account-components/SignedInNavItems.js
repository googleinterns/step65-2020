import React from 'react';
import {makeStyles} from '@material-ui/core/styles';

import {Link} from 'react-router-dom';

import {
  List, ListItem,
  ListItemIcon, ListItemText,
} from '@material-ui/core';

import UploadPhotoIcon from '@material-ui/icons/AddPhotoAlternate';
import MyArtIcon from '@material-ui/icons/Brush';

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: 'none',
    color: theme.palette.text.primary,
  },
}));

export default function NavigationItems() {
  const classes = useStyles();
  return (
    <List>
      <Link to="/my-art" className={classes.link}>
        <ListItem button>
          <ListItemIcon>
            <MyArtIcon />
          </ListItemIcon>
          <ListItemText primary={'My Art'} />
        </ListItem>
      </Link>
      <Link to="/upload-artwork" className={classes.link}>
        <ListItem button>
          <ListItemIcon>
            <UploadPhotoIcon />
          </ListItemIcon>
          <ListItemText primary={'Upload Artwork'} />
        </ListItem>
      </Link>
    </List>
  );
}
