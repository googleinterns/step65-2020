import React from 'react';
import {makeStyles} from '@material-ui/core/styles';

import {Link} from 'react-router-dom';

import {
  List, ListItem,
  ListItemIcon, ListItemText,
} from '@material-ui/core';

import HomeIcon from '@material-ui/icons/Home';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import UserUploadsIcon from '@material-ui/icons/SupervisedUserCircle';
import UploadPhotoIcon from '@material-ui/icons/AddPhotoAlternate';

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: 'none',
    color: theme.palette.text.primary,
  },
}));

function NavigationItems() {
  const classes = useStyles();
  return (
    <List>
      <Link to="/" className={classes.link}>
        <ListItem button>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary={'Home'} />
        </ListItem>
      </Link>
      <Link to="/museum-gallery" className={classes.link}>
        <ListItem button>
          <ListItemIcon>
            <PhotoLibraryIcon />
          </ListItemIcon>
          <ListItemText primary={'Museum Gallery'} />
        </ListItem>
      </Link>
      <Link to="/user-uploads-gallery" className={classes.link}>
        <ListItem button>
          <ListItemIcon>
            <UserUploadsIcon />
          </ListItemIcon>
          <ListItemText primary={'User Uploads Gallery'} />
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

export default NavigationItems;

