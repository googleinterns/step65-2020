import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import {useSelector} from 'react-redux';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    transition: '0.3s',
  },
  avatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    transition: '0.3s',
  },
  div: {
    paddingBottom: theme.spacing(2),
  },
}));

export default function AvatarHeader() {
  const classes = useStyles();
  const auth = useSelector((state) => state.firebase.auth);
  return (
    <>
      <Divider />
      <div className={classes.root}>
        <Avatar
          className={classes.avatar}
          src={auth.photoURL}
        />
        <div className={classes.div} />
        <Typography variant={'h6'} noWrap>
          {auth.displayName}
        </Typography>
        <Typography color={'textSecondary'} noWrap gutterBottom>
          {auth.email}
        </Typography>
      </div>
      <Divider />
    </>
  );
}
