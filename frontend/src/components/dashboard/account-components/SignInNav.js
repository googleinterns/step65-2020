import React from 'react';
import {makeStyles} from '@material-ui/core/styles';

import {Link} from 'react-router-dom';

import {
  List, ListItem,
  ListItemIcon, ListItemText,
} from '@material-ui/core';

import SignInIcon from '@material-ui/icons/AccountCircle';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
  link: {
    color: theme.palette.text.primary,
    textDecoration: 'none',
  },
}));

export default function SignInNav() {
  const classes = useStyles();
  return (
    <>
      <Divider/>
      <List>
        <Link to="/sign-in" className={classes.link}>
          <ListItem button>
            <ListItemIcon>
              <SignInIcon />
            </ListItemIcon>
            <ListItemText primary={'Sign In'} />
          </ListItem>
        </Link>
      </List>
    </>
  );
}
