import React from 'react';
import {makeStyles} from '@material-ui/core/styles';

import {Link} from 'react-router-dom';

import {
  List, ListItem,
  ListItemIcon, ListItemText,
} from '@material-ui/core';

import FavoriteIcon from '@material-ui/icons/Favorite';

const useStyles = makeStyles((theme) => ({
  link: {
    color: theme.palette.text.primary,
    textDecoration: 'none',
  },
}));

export default function SignedInNavItems() {
  const classes = useStyles();
  return (
    <List>
      <Link to="/my-favorites" className={classes.link}>
        <ListItem button>
          <ListItemIcon>
            <FavoriteIcon />
          </ListItemIcon>
          <ListItemText primary={'My Favorites'} />
        </ListItem>
      </Link>
    </List>
  );
}
