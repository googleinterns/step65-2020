
import React from 'react';
import clsx from 'clsx';
import {
  BrowserRouter as Router,
  Switch, Route,
} from 'react-router-dom';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import NavigationItems from './NavigationItems';
import GalleryPreview from './GalleryPreview';
import ArtworkCloseUpCard from './ArtworkCloseUpCard';
import UploadsFields from './UploadsFields';
import Gallery from './Gallery';
import Banner from './Banner';
import AICimg from './images/aic-inside.jpg';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Router>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Header
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ?
              <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <Divider />
          <NavigationItems />
          <Divider />
        </Drawer>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />
          <Switch>
            <Route exact path="/">
              <Container>
                <GalleryPreview name="Museum Gallery" link="/museum-gallery"/>
                <GalleryPreview
                  name="User Uploads Gallery"
                  link="/user-uploads-gallery"
                />
              </Container>
            </Route>
            <Route exact path="/museum-gallery">
              <Container>
                <Banner
                  title="Museum Gallery"
                  description="Explore the Art Institute of Chicago!"
                  imgURL={AICimg}
                />
                <Gallery />
              </Container>
            </Route>
            <Route exact path="/user-uploads-gallery">
              <Container>
                <Typography variant="h3" gutterBottom>
                  User Uploads Gallery
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Contrary to popular belief, Lorem Ipsum is not simply random
                  text. It has roots in a piece of classical Latin literature
                  from 45 BC, making it over 2000 years old. Richard McClintock,
                  a Latin professor at Hampden-Sydney College in Virginia,
                  looked up one of the more obscure Latin words, consectetur,
                  from a Lorem Ipsum passage, and going through the cites of
                  the word in classical literature, discovered the undoubtable
                  source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33
                  of de Finibus Bonorum et Malorum (The Extremes of Good and
                  Evil) by Cicero, written in 45 BC. This book is a treatise
                  on the theory of ethics, very popular during the Renaissance.
                  The first line of Lorem Ipsum, Lorem ipsum dolor sit amet..,
                  comes from a line in section 1.10.32.
                </Typography>
              </Container>
            </Route>
            <Route exact path="/upload-artwork">
              <Container>
                <Typography variant="h3" gutterBottom>
                  Upload Artwork
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Here you can upload artwork of your own! Please be sure to
                  include your name and a very detailed description of your
                  artwork. If you are unsure of what qualifies as a good
                  description, we&apos;ve provided some links below to some
                  resources that can help guide you!
                </Typography>
                <UploadsFields name="User Information"/>
              </Container>
            </Route>
            <Route exact path="/picture-id">
              <Container>
                <ArtworkCloseUpCard/>
              </Container>
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
}
