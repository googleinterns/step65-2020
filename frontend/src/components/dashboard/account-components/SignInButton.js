import React from 'react';
import {Link} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: 'none',
    color: theme.palette.text.primary,
    display: 'flex',
  },
}));

export default function SignInButton() {
  const classes = useStyles();

  return (
    <div>
      <Link to='/sign-in' className={classes.link}>
        <Button variant="contained" color="secondary">Sign In</Button>
      </Link>
    </div>
  );
}

