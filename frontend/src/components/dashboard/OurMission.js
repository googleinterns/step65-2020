import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import UniversalIcon from '@material-ui/icons/Public';
import AccessibilityIcon from '@material-ui/icons/AccessibilityNew';
import ArtIcon from '@material-ui/icons/Brush';
import LogoImg from './images/logo.JPG';


const useStyles = makeStyles((theme) => ({
  container: {
    color: theme.palette.secondary.contrastText,
    padding: theme.spacing(10),
  },
  avatar: {
    background: theme.palette.secondary.light,
    height: theme.spacing(7),
    margin: theme.spacing(2),
    width: theme.spacing(7),
  },
  image: {
    maxWidth: '13rem',
  },
}));

export default function OurMission() {
  const classes = useStyles();
  const primaryTypographyProps = {variant: 'h6', component: 'h3'};

  return (
    <Container className={classes.container}>
      <Grid
        container
        direction="row"
        alignItems="center"
        justify="center"
        spacing={4}
      >
        <Grid
          container
          item
          xs={12}
          md={5}
          className={classes.title}
          alignItems="center"
          justify="center"
          direction="column"
          spacing={1}
        >
          <Grid item>
            <Typography variant="h2" align="center">
              Our Mission
            </Typography>
          </Grid>
          <Grid item>
            <img src={LogoImg} alt="logo" className={classes.image}/>
          </Grid>
        </Grid>
        <Grid item xs={12} md={7}>
          <List>
            <ListItem>
              <ListItemAvatar>
                <Avatar className={classes.avatar}>
                  <UniversalIcon fontSize="large"/>
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Create an art experience for everyone."
                primaryTypographyProps={primaryTypographyProps}
              />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar className={classes.avatar}>
                  <AccessibilityIcon fontSize="large"/>
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Build with accessibility as the primary focus."
                primaryTypographyProps={primaryTypographyProps}
              />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar className={classes.avatar}>
                  <ArtIcon fontSize="large"/>
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Showcase the artwork of our users."
                primaryTypographyProps={primaryTypographyProps}
              />
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </Container>
  );
}
