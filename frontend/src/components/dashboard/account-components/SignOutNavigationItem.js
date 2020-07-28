import React from 'react';
import {makeStyles} from '@material-ui/core/styles';

import {Link} from 'react-router-dom';

import {
  ListItem,
  ListItemIcon, ListItemText,
} from '@material-ui/core';

import SignOutIcon from '@material-ui/icons/ExitToApp';
import {useFirebase} from 'react-redux-firebase';

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: 'none',
    color: theme.palette.text.primary,
  },
}));

export default function SignOutNavigationItem() {
  const classes = useStyles();
  const firebase = useFirebase();

  const handleSignOut = () => {
    firebase.logout();
  };

  return (
    <Link to="/" className={classes.link}>
      <ListItem button onClick={handleSignOut}>
        <ListItemIcon>
          <SignOutIcon />
        </ListItemIcon>
        <ListItemText primary={'Sign Out'} />
      </ListItem>
    </Link>

  );
}

